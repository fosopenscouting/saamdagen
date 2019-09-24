package be.fos.saamdagen.ui.sessiondetail

import androidx.lifecycle.ViewModel;
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.Session

class SessionDetailViewModel : ViewModel() {
    private val saamdagenDataRepository = SaamdagenDataRepository(JsonSaamdagenDataSource)

    fun getSession(id: String): Session {

        return saamdagenDataRepository.getSessionById(id)
    }


}
