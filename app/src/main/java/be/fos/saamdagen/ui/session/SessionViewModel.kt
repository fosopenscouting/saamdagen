package be.fos.saamdagen.ui.session

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel;
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.Session
import be.fos.saamdagen.model.SessionParticipant
import com.microsoft.appcenter.analytics.Analytics

class SessionViewModel : ViewModel() {

    private var sessions: List<Session>

    private  val _participantSessions = MutableLiveData<List<SessionParticipant>>()
    val participantSessions: LiveData<List<SessionParticipant>>
        get() = _participantSessions

    init {
        val repo = SaamdagenDataRepository
        this.sessions = repo.getSessions()
    }

    fun getSessionsForType(type: String): List<Session> {
        return sessions.filter { it.type == type }
    }

    fun findSessionsFor(name: String): Boolean {

        Analytics.trackEvent("Gezocht naar sessie")
        val cleanedString = name.toLowerCase().replace(" ","")

     val filteredSessions = sessions.filter {
         session ->
         session.participants.any {
             val nameString = "${it.firstName}${it.lastName}".toLowerCase().replace(" ", "")
             nameString == cleanedString }

        }

        if(filteredSessions.isEmpty()) {
            return false
        }

      val mapped =  filteredSessions.map {
             SessionParticipant(it, it.participants.first {
                 val nameString = "${it.firstName}${it.lastName}".toLowerCase().replace(" ", "")
                 nameString == cleanedString
             }.time)
        }


        Log.d("SESSION_VIE","Mapped the items")

        _participantSessions.value = mapped.sortedBy { it.time }

        return true

    }
}
