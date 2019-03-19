package be.fos.saamdagen.widget

import android.widget.TextView
import androidx.databinding.BindingAdapter

@BindingAdapter("app:cardTitle")
fun setCardTitle(textView: TextView, title: String) {
    textView.text = title
}

@BindingAdapter("app:cardDescription")
fun setCardDescription(textView: TextView, description: String) {
    textView.text = description
}