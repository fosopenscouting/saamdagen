package be.fos.saamdagen.ui.session

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.BR
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.ItemSessionBinding
import be.fos.saamdagen.model.Session

class SessionPageAdapter(private val eventListener: SessionActions): ListAdapter<Session, SessionViewHolder>(SessionDiff) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SessionViewHolder {
      val view = DataBindingUtil.inflate<ItemSessionBinding>(LayoutInflater.from(parent.context),viewType,parent,false)

        return SessionViewHolder(view, eventListener)
        }

    override fun onBindViewHolder(holder: SessionViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

   override fun getItemViewType(position: Int): Int {
        return R.layout.item_session
    }

}

class SessionViewHolder(private val binding: ItemSessionBinding, private val eventListener: SessionActions): RecyclerView.ViewHolder(binding.root) {

    fun bind(session: Session) {
        binding.setVariable(BR.session,session)
        binding.eventListener = eventListener
        binding.executePendingBindings()
    }
}

object SessionDiff: DiffUtil.ItemCallback<Session>() {
    override fun areItemsTheSame(oldItem: Session, newItem: Session): Boolean {
        return oldItem.title == newItem.title
    }

    override fun areContentsTheSame(oldItem: Session, newItem: Session): Boolean {
       return oldItem.title == newItem.title &&
               oldItem.description == newItem.description &&
               oldItem.location == newItem.description &&
               oldItem.type == newItem.type
    }

}