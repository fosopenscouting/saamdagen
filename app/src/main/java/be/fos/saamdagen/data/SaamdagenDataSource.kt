package be.fos.saamdagen.data

import be.fos.saamdagen.model.SaamdagenData

interface SaamdagenDataSource {

    fun getOfflineSaamdagenData(): SaamdagenData?
}