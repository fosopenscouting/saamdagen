package be.fos.saamdagen.ui.map


import android.os.Build
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import android.widget.TextView
import androidx.annotation.DrawableRes
import androidx.appcompat.content.res.AppCompatResources
import androidx.databinding.BindingAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.ItemMapVariantBinding
import be.fos.saamdagen.util.executeAfter

internal class MapVariantAdapter(private val callback: (MapVariant) -> Unit):
   RecyclerView.Adapter<MapVariantViewHolder>() {

    var currentSelection: MapVariant? = null
        set(value) {
            if (field == value) {
                return
            }
            val previous = field
            if (previous != null) {
                notifyItemChanged(items.indexOf(previous)) // deselect previous selection
            }
            field = value
            if (value != null) {
                notifyItemChanged(items.indexOf(value)) // select new selection
            }
        }

    private val items = MapVariant.values().toMutableList()
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MapVariantViewHolder {
        return MapVariantViewHolder(ItemMapVariantBinding.inflate(LayoutInflater.from(parent.context),parent,false))
    }

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: MapVariantViewHolder, position: Int) {
        val mapVariant = items[position]
        holder.bind(mapVariant, mapVariant == currentSelection, callback)
    }


}

internal class MapVariantViewHolder(val binding: ItemMapVariantBinding): RecyclerView.ViewHolder(binding.root) {

    fun bind(mapVariant: MapVariant, isSelected: Boolean, callback: (MapVariant) -> Unit) {
        binding.executeAfter {
            variant = mapVariant
            isChecked = isSelected
        }

        itemView.setOnClickListener {
            callback(mapVariant)
        }
    }
}

@BindingAdapter("variantIcon")
fun variantIcon(view: TextView, @DrawableRes iconResId: Int) {
    val drawable = AppCompatResources.getDrawable(view.context, iconResId)

    //Onder API 23 moeten we handmatig drawableTint toepassen
    if(Build.VERSION.SDK_INT <= Build.VERSION_CODES.M) {
        drawable?.setTintList(
            AppCompatResources.getColorStateList(view.context, R.color.map_variant_icon)
        )
    }
    view.setCompoundDrawablesRelativeWithIntrinsicBounds(drawable,null,null,null)
}