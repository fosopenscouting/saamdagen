package be.fos.saamdagen.ui.schedule

import android.graphics.drawable.GradientDrawable
import android.view.View
import android.widget.TextView

import androidx.databinding.BindingAdapter
import be.fos.saamdagen.R
import java.text.SimpleDateFormat
import java.time.format.DateTimeFormatter
import java.util.*

private val agendaTimePattern = SimpleDateFormat("HH:mm")

@BindingAdapter(
        value = ["sessionColor", "sessionStrokeColor", "sessionStrokeWidth"], requireAll = true)
fun sessionColor(view: View, fillColor: Int, strokeColor: Int, strokeWidth: Float) {
        view.background = (view.background as? GradientDrawable ?: GradientDrawable()).apply {
            setColor(fillColor)
            setStroke(strokeWidth.toInt(), strokeColor)
        }
    }


@BindingAdapter(value = ["startTime", "endTime"], requireAll = true)
fun agendaDuration(textView: TextView, startTime: Date, endTime: Date) {
    textView.text = textView.context.getString(R.string.agenda_duration, agendaTimePattern.format(startTime), agendaTimePattern.format(endTime))
}

