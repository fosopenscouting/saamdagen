package be.fos.saamdagen.data

import be.fos.saamdagen.model.SaamdagenData
import be.fos.saamdagen.model.Session

 class SaamdagenDataRepository {

     private lateinit var saamdagenData: SaamdagenData
     constructor(jsonSaamdagenDataSource: JsonSaamdagenDataSource) {
         this.saamdagenData = jsonSaamdagenDataSource.getOfflineSaamdagenData()!!
     }
    fun getSessions(): List<Session> {
        return this.saamdagenData.sessions
    }
}