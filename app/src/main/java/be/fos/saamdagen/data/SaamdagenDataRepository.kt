package be.fos.saamdagen.data

import be.fos.saamdagen.model.SaamdagenData
import be.fos.saamdagen.model.Block
import be.fos.saamdagen.model.Info

class SaamdagenDataRepository {

     private lateinit var saamdagenData: SaamdagenData
     constructor(jsonSaamdagenDataSource: JsonSaamdagenDataSource) {
         this.saamdagenData = jsonSaamdagenDataSource.getOfflineSaamdagenData()!!
     }
    fun getSessions(): List<Block> {
        return this.saamdagenData.blocks
    }

     fun getInfo(): List<Info> {
         return this.saamdagenData.info
     }
}