package be.fos.saamdagen.data

import be.fos.saamdagen.data.info.InfoDeserializer
import be.fos.saamdagen.data.session.SessionDeserializer
import be.fos.saamdagen.model.Info
import be.fos.saamdagen.model.SaamdagenData
import be.fos.saamdagen.model.Session
import com.google.gson.GsonBuilder
import com.google.gson.stream.JsonReader
import java.io.InputStream

object SaamdagenDataJsonParser {
    fun parseSaamdagenData(unprocessedData: InputStream): SaamdagenData {
        val jsonReader = JsonReader(unprocessedData.reader())

        val gson = GsonBuilder()
            .registerTypeAdapter(Session::class.java, SessionDeserializer())
            .registerTypeAdapter(Info::class.java,InfoDeserializer())
            .create()

        return gson.fromJson(jsonReader, SaamdagenData::class.java)
    }
}