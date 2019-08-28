package be.fos.saamdagen.ui.schedule

import android.view.LayoutInflater

import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.databinding.ViewDataBinding
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.BR
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.ItemBlockBinding
import be.fos.saamdagen.model.Block

class ScheduleDayAdapter() : ListAdapter<Block, SessionViewHolder>(SessionDiff) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SessionViewHolder {
        //
        //
        // val view = LayoutInflater.from(parent.context).inflate(R.layout.item_block, parent, false)

        val view = DataBindingUtil.inflate<ItemBlockBinding>(LayoutInflater.from(parent.context),viewType,parent,false)
        return SessionViewHolder(view)
    }

    override fun onBindViewHolder(holder: SessionViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    override fun getItemViewType(position: Int): Int {
        return R.layout.item_block
    }

}

class SessionViewHolder(private val binding: ViewDataBinding) : RecyclerView.ViewHolder(binding.root) {

    fun bind(block: Block) {
        binding.setVariable(BR.block,block)
        binding.executePendingBindings()
    }
}

object SessionDiff : DiffUtil.ItemCallback<Block>() {
    override fun areItemsTheSame(
        oldItem: Block,
        newItem: Block
    ): Boolean {
        // We don't have to compare the #userEvent because the id of #session and #userEvent
        // should match
        return oldItem.title == newItem.title
    }

    override fun areContentsTheSame(oldItem: Block, newItem: Block): Boolean {
        return oldItem == newItem
    }
}