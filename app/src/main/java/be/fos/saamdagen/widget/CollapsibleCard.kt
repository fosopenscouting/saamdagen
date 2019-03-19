package be.fos.saamdagen.widget

import android.content.Context
import android.os.Build
import android.os.Parcel
import android.os.Parcelable
import android.transition.Transition
import android.transition.TransitionInflater
import android.transition.TransitionManager
import android.util.AttributeSet
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.FrameLayout
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.content.res.AppCompatResources
import be.fos.saamdagen.R

class CollapsibleCard @JvmOverloads constructor(
    context: Context,
    attributes: AttributeSet? = null,
    defStyleAttribute: Int = 0
): FrameLayout(context, attributes, defStyleAttribute) {

    private var expanded = false
    private val cardTitleView: TextView
    private val cardDescriptionView: TextView
    private val expandIcon: ImageView
    private val titleContainer: View
    private val toggle: Transition
    private val root: View
    val cardTitle: String


    init {
        val arr = context.obtainStyledAttributes(attributes, R.styleable.CollapsibleCard, 0, 0)
        cardTitle = arr.getString(R.styleable.CollapsibleCard_cardTitle)
        val cardDescription = arr.getString(R.styleable.CollapsibleCard_cardDescription)
        arr.recycle()
        root = LayoutInflater.from(context)
            .inflate(R.layout.collapsible_card_content, this, true)

        titleContainer = root.findViewById(R.id.title_container)
        cardTitleView = root.findViewById<TextView>(R.id.card_title).apply {
            text = cardTitle
        }

        cardDescriptionView = root.findViewById<TextView>(R.id.card_description).apply {
            text = cardDescription
        }
        expandIcon = root.findViewById(R.id.expand_icon)
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) {
            expandIcon.imageTintList =
                AppCompatResources.getColorStateList(context, R.color.collapsing_section)
        }
        toggle = TransitionInflater.from(context)
            .inflateTransition(R.transition.info_card_toggle)
        titleContainer.setOnClickListener {
            toggleExpanded()
        }
    }

    private fun toggleExpanded() {
        expanded = !expanded
        toggle.duration = if (expanded) 300L else 200L
        TransitionManager.beginDelayedTransition(root.parent as ViewGroup, toggle)
        cardDescriptionView.visibility = if (expanded) View.VISIBLE else View.GONE
        expandIcon.rotation = if (expanded) 180f else 0f
        // activated used to tint controls when expanded
        expandIcon.isActivated = expanded
        cardTitleView.isActivated = expanded
    }

    override fun onSaveInstanceState(): Parcelable {
        val savedState = SavedState(super.onSaveInstanceState())
        savedState.expanded = expanded
        return savedState
    }

    override fun onRestoreInstanceState(state: Parcelable?) {
        if (state is SavedState) {
            super.onRestoreInstanceState(state.superState)
            if (expanded != state.expanded) {
                toggleExpanded()
            }
        } else {
            super.onRestoreInstanceState(state)
        }
    }

    internal class SavedState : BaseSavedState {
        var expanded = false

        constructor(source: Parcel) : super(source) {
            expanded = source.readByte().toInt() != 0
        }

        constructor(superState: Parcelable) : super(superState)

        override fun writeToParcel(out: Parcel, flags: Int) {
            super.writeToParcel(out, flags)
            out.writeByte((if (expanded) 1 else 0).toByte())
        }

        companion object {
            @JvmField
            val CREATOR = object : Parcelable.Creator<SavedState> {
                override fun createFromParcel(source: Parcel): SavedState {
                    return SavedState(source)
                }

                override fun newArray(size: Int): Array<SavedState?> {
                    return arrayOfNulls(size)
                }
            }
        }
    }


}