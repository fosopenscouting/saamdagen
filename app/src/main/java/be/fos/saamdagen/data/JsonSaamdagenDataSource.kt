package be.fos.saamdagen.data

import android.content.res.Resources
import be.fos.saamdagen.R
import be.fos.saamdagen.model.SaamdagenData

object JsonSaamdagenDataSource: SaamdagenDataSource {
    override fun getOfflineSaamdagenData(): SaamdagenData? {
        return loadAndParseSaamdagenData()
    }

    private fun loadAndParseSaamdagenData(): SaamdagenData {
        val saamdagenDataStream = this.javaClass.classLoader!!.getResource("saamdagen_data.json").openStream()


        return SaamdagenDataJsonParser.parseSaamdagenData(saamdagenDataStream)
    }

}