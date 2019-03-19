package be.fos.saamdagen.ui.info

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.databinding.ItemInfoBinding
import be.fos.saamdagen.model.Info


class InfoAdapter: ListAdapter<Info,InfoAdapter.ViewHolder>(InfoDiff) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(ItemInfoBinding.inflate(LayoutInflater.from(parent.context),parent,false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(getItem(position))
    }


    class ViewHolder(private val binding: ItemInfoBinding): RecyclerView.ViewHolder(binding.root) {
      fun bind(item: Info) {
          binding.apply {
              infoItem = item
              executePendingBindings()
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