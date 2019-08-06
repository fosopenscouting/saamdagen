package be.fos.saamdagen.ui.schedule

import be.fos.saamdagen.model.Session
import java.util.*

//TODO: find beter way to get hours and minutes
fun indexSessionHeaders(sessions: List<Session>): List<Pair<Int, Date>> {
    return sessions
        .mapIndexed { index, session ->
            index to session.startTime
        }
        .distinctBy { it.second.hours to it.second.minutes }
}