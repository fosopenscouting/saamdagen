package be.fos.saamdagen.data

import be.fos.saamdagen.model.*

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

    fun getNewsItems(): List<NewsItem> {
        return this.saamdagenData.news
    }

    fun getActivityById(id: Int): Session {
        return this.saamdagenData.sessions.filter { session ->
            session.type == "activiteit"
        }.first { session -> session.id == id }
    }

    fun getWorkshopById(id: Int): Session {
        return this.saamdagenData.sessions.filter { session ->
            session.type == "workshop"
        }.first { session -> session.id == id }
    }
}