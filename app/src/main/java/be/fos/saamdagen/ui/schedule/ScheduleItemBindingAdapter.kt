package be.fos.saamdagen.ui.schedule

import android.graphics.drawable.GradientDrawable
import android.view.View
import androidx.databinding.BindingAdapter

@BindingAdapter(
    value = ["agendaColor", "agendaStrokeColor", "agendaStrokeWidth"], requireAll = true)
fun agendaColor(view: View, fillColor: Int, strokeColor: Int, strokeWidth: Float) {
    view.background = (view.background as? GradientDrawable ?: GradientDrawable()).apply {
        setColor(fillColor)
        setStroke(strokeWidth.toInt(), strokeColor)
    }
}