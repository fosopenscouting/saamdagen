package be.fos.saamdagen.ui.map


import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.databinding.ItemMapVariantBinding

internal class MapVariantAdapter(private val callback: (MapVariant) -> Unit):
   RecyclerView.Adapter<MapVariantViewHolder>() {

    private val items = MapVariant.values().toMutableList()
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): MapVariantViewHolder {
        return MapVariantViewHolder(ItemMapVariantBinding.inflate(LayoutInflater.from(parent.context),parent,false))
    }

    override fun getItemCount(): Int = items.size

    override fun onBindViewHolder(holder: MapVariantViewHolder, position: Int) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }


}

internal class MapVariantViewHolder(binding: ItemMapVariantBinding): RecyclerView.ViewHolder(binding.root)