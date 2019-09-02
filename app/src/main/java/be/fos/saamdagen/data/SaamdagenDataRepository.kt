package be.fos.saamdagen.data

import be.fos.saamdagen.model.SaamdagenData
import be.fos.saamdagen.model.Block
import be.fos.saamdagen.model.Info
import be.fos.saamdagen.model.Session

class SaamdagenDataRepository {

     private lateinit var saamdagenData: SaamdagenData
     constructor(jsonSaamdagenDataSource: JsonSaamdagenDataSource) {
         this.saamdagenData = jsonSaamdagenDataSource.getOfflineSaamdagenData()!!
     }
    fun getBlocks(): List<Block> {
        return this.saamdagenData.blocks.sortedBy { it.startTime }
    }

     fun getInfo(): List<Info> {
         return this.saamdagenData.info
     }

    fun getSessions(): List<Session> {
        return this.saamdagenData.sessions.sortedBy { it.title }
    }
}