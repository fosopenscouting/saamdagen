package be.fos.saamdagen.ui.home

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.ItemHomeBinding
import be.fos.saamdagen.model.NewsItem

class NewsItemAdapter: ListAdapter<NewsItem, NewsItemViewHolder>(NewsItemDiff) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): NewsItemViewHolder {
       val view = DataBindingUtil.inflate<ItemHomeBinding>(LayoutInflater.from(parent.context),viewType,parent,false)

        return NewsItemViewHolder(view)
           }

    override fun onBindViewHolder(holder: NewsItemViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    override fun getItemViewType(position: Int): Int {
        return R.layout.item_home
    }

}

class NewsItemViewHolder(private val binding: ItemHomeBinding): RecyclerView.ViewHolder(binding.root) {
    fun bind(item: NewsItem) {
        binding.item = item
        binding.executePendingBindings()
    }
}

object  NewsItemDiff: DiffUtil.ItemCallback<NewsItem>() {
    override fun areItemsTheSame(oldItem: NewsItem, newItem: NewsItem): Boolean {
        return oldItem.title == newItem.title
    }

    override fun areContentsTheSame(oldItem: NewsItem, newItem: NewsItem): Boolean {
        return oldItem.title == newItem.title && oldItem.content == newItem.content
    }

}