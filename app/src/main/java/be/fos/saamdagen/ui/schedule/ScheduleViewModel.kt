package be.fos.saamdagen.ui.schedule

import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.ViewModel;
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.EventDay
import be.fos.saamdagen.model.Session
import java.lang.Exception

class ScheduleViewModel : ViewModel() {

    var sessions: List<Session>


    init {
        val repo = SaamdagenDataRepository(JsonSaamdagenDataSource)

        this.sessions = repo.getSessions()

    }

    /**
     * Called by all the fragments inside the viewpager to get the correct events for the day
     */
    fun getSessionsForDay(eventDay: EventDay): List<Session>  {

        return sessions.filter {
            eventDay.contains(it)
        }


    }
}
