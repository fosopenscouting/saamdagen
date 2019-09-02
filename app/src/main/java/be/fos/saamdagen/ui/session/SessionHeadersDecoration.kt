package be.fos.saamdagen.ui.session

import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint.ANTI_ALIAS_FLAG
import android.text.Layout
import android.text.SpannableStringBuilder
import android.text.StaticLayout
import android.text.TextPaint
import android.text.style.AbsoluteSizeSpan
import androidx.core.content.res.*
import androidx.core.graphics.withTranslation
import androidx.core.text.inSpans
import androidx.core.view.get
import androidx.core.view.isEmpty
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.R
import be.fos.saamdagen.model.Session
import java.lang.Exception

class  SessionHeadersDecoration(context: Context, sessions: List<Session>): RecyclerView.ItemDecoration() {

    private val paint: TextPaint
    private val width: Int
    private val paddingTop: Int
    private val sessionMinTextSize: Int

    init {
        val attrs = context.obtainStyledAttributes(
            R.style.Widget_Saamdagen_SessionHeaders,
            R.styleable.SessionHeader
        )

        paint = TextPaint(ANTI_ALIAS_FLAG).apply {
            color = attrs.getColorOrThrow(R.styleable.SessionHeader_android_textColor)
            textSize = attrs.getDimensionOrThrow(R.styleable.SessionHeader_sessionTextSize)

            try {
                typeface = ResourcesCompat.getFont(context, attrs.getResourceIdOrThrow(R.styleable.SessionHeader_android_fontFamily))
            }
            catch (_: Exception) {
                //Ignore
            }

            width = attrs.getDimensionPixelSizeOrThrow(R.styleable.SessionHeader_android_width)
            paddingTop = attrs.getDimensionPixelSizeOrThrow(R.styleable.SessionHeader_android_paddingTop)
            sessionMinTextSize = attrs.getDimensionPixelSizeOrThrow(R.styleable.SessionHeader_sessionMinTextSize)

            attrs.recycle()
        }
    }

    private val letters: Map<Int, StaticLayout> = indexSessionHeaders(sessions).map {
        it.first to createHeader(it.second)
    }.toMap()


    override fun onDrawOver(c: Canvas, parent: RecyclerView, state: RecyclerView.State) {
        if (letters.isEmpty() || parent.isEmpty()) return

        var earliestFoundHeaderPos = -1
        var prevHeaderTop = Int.MAX_VALUE

        // Loop over each attached view looking for header items.
        // Loop backwards as a lower header can push another higher one upward.
        for (i in parent.childCount - 1 downTo 0) {
            val view = parent.getChildAt(i)
            if (view == null) {
                // This should not be null, but observed null at times.
                // Guard against it to avoid crash and log the state.
                //TODO: Timber toevoegen
                /*  Timber.w(
                      """View is null. Index: $i, childCount: ${parent.childCount},
                          |RecyclerView.State: $state""".trimMargin()
                  )*/
                continue
            }
            val viewTop = view.top + view.translationY.toInt()
            if (view.bottom > 0 && viewTop < parent.height) {
                val position = parent.getChildAdapterPosition(view)
                letters[position]?.let { layout ->
                    paint.alpha = (view.alpha * 255).toInt()
                    val top = (viewTop + paddingTop)
                        .coerceAtLeast(paddingTop)
                        .coerceAtMost(prevHeaderTop - layout.height)
                    c.withTranslation(y = top.toFloat()) {
                        layout.draw(c)
                    }
                    earliestFoundHeaderPos = position
                    prevHeaderTop = viewTop
                }
            }
        }

        // If no headers found, ensure header of the first shown item is drawn.
        if (earliestFoundHeaderPos < 0) {
            earliestFoundHeaderPos = parent.getChildAdapterPosition(parent[0]) + 1
        }

        // Look back over headers to see if a prior item should be drawn sticky.
        for (headerPos in letters.keys.reversed()) {
            if (headerPos < earliestFoundHeaderPos) {
                letters[headerPos]?.let {
                    val top = (prevHeaderTop - it.height).coerceAtMost(paddingTop)
                    c.withTranslation(y = top.toFloat()) {
                        it.draw(c)
                    }
                }
                break
            }
        }
    }



    /**
     * Create a header layout for the given [startTime].
     */
    private fun createHeader(letter: Char): StaticLayout {
        val text =
            // Use a smaller text size and different pattern if event does not start on the hour
            SpannableStringBuilder().apply {
                inSpans(AbsoluteSizeSpan(sessionMinTextSize)) {
                    append(letter)

                }
            }

        return StaticLayout(text, paint, width, Layout.Alignment.ALIGN_CENTER, 1f, 0f, false)
    }
}