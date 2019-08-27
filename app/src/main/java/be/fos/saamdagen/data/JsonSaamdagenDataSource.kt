package be.fos.saamdagen.data

import be.fos.saamdagen.model.SaamdagenData

object JsonSaamdagenDataSource: SaamdagenDataSource {
    override fun getOfflineSaamdagenData(): SaamdagenData? {
        return loadAndParseSaamdagenData()
    }

    /**
     * Gets the json file with all data from the resources folder, parses it and returns the parsed [SaamdagenData] object
     */
    private fun loadAndParseSaamdagenData(): SaamdagenData {
        val saamdagenDataStream = this.javaClass.classLoader!!.getResource("saamdagen_data.json").openStream() //TODO: Get json file from the build config


        return SaamdagenDataJsonParser.parseSaamdagenData(saamdagenDataStream)
    }

}