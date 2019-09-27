package be.fos.saamdagen.ui.session

import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.ItemParticipantSessionBinding
import be.fos.saamdagen.model.SessionParticipant

class SessionParticipantAdapter(): ListAdapter<SessionParticipant,SessionParticipantViewHolder>(SessionParticipantDiff) {
    override fun onCreateViewHolder(
        parent: ViewGroup,
        viewType: Int
    ): SessionParticipantViewHolder {
     val view = DataBindingUtil.inflate<ItemParticipantSessionBinding>(LayoutInflater.from(parent.context), viewType, parent, false)

        Log.d("SESSION_A", "onCreate")
        return SessionParticipantViewHolder(view)
        }

    override fun onBindViewHolder(holder: SessionParticipantViewHolder, position: Int) {
        Log.d("SESSION_ADA", holder.toString())
       holder.bind(getItem(position))
           }

    override fun getItemViewType(position: Int): Int {
        return R.layout.item_participant_session
    }

}

class SessionParticipantViewHolder(private val binding: ItemParticipantSessionBinding): RecyclerView.ViewHolder(binding.root) {
    fun bind(item: SessionParticipant) {
        val text = "${item.session.type} - ${item.session.title} - ${item.time}"

        binding.type.text = item.session.type
        binding.name.text = item.session.title
        binding.time.text = item.time
        binding.executePendingBindings()
    }
}

object SessionParticipantDiff: DiffUtil.ItemCallback<SessionParticipant>() {
    override fun areItemsTheSame(
        oldItem: SessionParticipant,
        newItem: SessionParticipant
    ): Boolean {
        return oldItem.session.id == newItem.session.id && oldItem.time == newItem.time
    }

    override fun areContentsTheSame(
        oldItem: SessionParticipant,
        newItem: SessionParticipant
    ): Boolean {
        return oldItem.session.id == newItem.session.id && oldItem.time == newItem.time
    }

}