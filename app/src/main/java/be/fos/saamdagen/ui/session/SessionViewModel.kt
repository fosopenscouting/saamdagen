package be.fos.saamdagen.ui.session

import androidx.lifecycle.ViewModel;
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.Session

class SessionViewModel : ViewModel() {

    private var sessions: List<Session>

    init {
        val repo = SaamdagenDataRepository(JsonSaamdagenDataSource)
        this.sessions = repo.getSessions()
    }

    fun getSessionsForType(type: String): List<Session> {
        return sessions.filter { it.type == type }
    }
}
