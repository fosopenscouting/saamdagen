package be.fos.saamdagen.ui.info

import androidx.lifecycle.ViewModel
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.Info

class InfoViewModel: ViewModel() {

    val info: List<Info>

    init {
        this.info = SaamdagenDataRepository.getInfo()
    }
}