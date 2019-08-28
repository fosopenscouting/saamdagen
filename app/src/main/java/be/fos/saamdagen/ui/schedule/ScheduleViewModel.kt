package be.fos.saamdagen.ui.schedule

import androidx.lifecycle.ViewModel;
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.EventDay
import be.fos.saamdagen.model.Block

class ScheduleViewModel : ViewModel() {

    private var blocks: List<Block>

    init {
        val repo = SaamdagenDataRepository(JsonSaamdagenDataSource)

        this.blocks = repo.getSessions()
    }

    /**
     * Called by all the fragments inside the viewpager to get the correct events for the day
     */
    fun getSessionsForDay(eventDay: EventDay): List<Block>  {

        return blocks.filter {
            eventDay.contains(it)
        }
    }
}
