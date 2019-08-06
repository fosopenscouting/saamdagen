package be.fos.saamdagen.ui.schedule

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.LifecycleOwner
import androidx.lifecycle.LiveData
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.R
import be.fos.saamdagen.model.Info
import be.fos.saamdagen.model.Session
import kotlinx.android.synthetic.main.item_session.view.*
import java.time.ZoneId

class ScheduleDayAdapter() : ListAdapter<Session, SessionViewHolder>(SessionDiff) {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): SessionViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_session, parent, false)

        return SessionViewHolder(view)
    }

    override fun onBindViewHolder(holder: SessionViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

}

class SessionViewHolder(private val view: View) : RecyclerView.ViewHolder(view) {

    fun bind(session: Session) {
        view.apply {
            view.agenda_title.text = session.title
            view.duration.text = "1 hour // Amphittheater"

        }
    }
}

object SessionDiff : DiffUtil.ItemCallback<Session>() {
    override fun areItemsTheSame(
        oldItem: Session,
        newItem: Session
    ): Boolean {
        // We don't have to compare the #userEvent because the id of #session and #userEvent
        // should match
        return oldItem.title == newItem.title
    }

    override fun areContentsTheSame(oldItem: Session, newItem: Session): Boolean {
        return oldItem == newItem
    }
}