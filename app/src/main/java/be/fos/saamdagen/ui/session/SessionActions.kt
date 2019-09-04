package be.fos.saamdagen.ui.session

import be.fos.saamdagen.model.Session

interface SessionActions {

    fun openSessionDetail(title: String, description: String)

    fun onStarClicked(session: Session)
}