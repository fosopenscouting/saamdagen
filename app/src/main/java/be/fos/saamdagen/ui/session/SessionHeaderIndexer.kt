package be.fos.saamdagen.ui.session

import be.fos.saamdagen.model.Session

fun indexSessionHeaders(sessions: List<Session>): List<Pair<Int,Char>> {
    return sessions
        .mapIndexed { index, session ->
            index to session.title[0]
        }
        .distinctBy { it.second to it.second }
}

