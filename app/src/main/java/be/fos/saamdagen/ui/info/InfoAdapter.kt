package be.fos.saamdagen.ui.info

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.R
import be.fos.saamdagen.model.Info
import kotlinx.android.synthetic.main.collapsible_card_content.view.*
import kotlinx.android.synthetic.main.item_info.view.*


class InfoAdapter: ListAdapter<Info,InfoAdapter.ViewHolder>(InfoDiff) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
       // return ViewHolder(ItemInfoBinding.inflate(LayoutInflater.from(parent.context),parent,false))

        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_info,parent,false)

        return ViewHolder(view)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }




    class ViewHolder(private val view: View): RecyclerView.ViewHolder(view) {
      fun bind(item: Info) {
         view.apply {
            card.cardTitle = item.title
             card.cardDescription = item.content
             if(item.imageName != null)
             card.cardImage = context.resources.getIdentifier(item.imageName,"drawable",context.packageName)
         }
      }
    }
}

object InfoDiff : DiffUtil.ItemCallback<Info>() {
    override fun areItemsTheSame(
        oldItem: Info,
        newItem: Info
    ): Boolean {
        // We don't have to compare the #userEvent because the id of #session and #userEvent
        // should match
        return oldItem.title == newItem.title
    }

    override fun areContentsTheSame(oldItem: Info, newItem: Info): Boolean {
        return oldItem == newItem
    }
}