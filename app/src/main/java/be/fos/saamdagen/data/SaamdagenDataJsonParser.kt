package be.fos.saamdagen.data

import be.fos.saamdagen.data.info.InfoDeserializer
import be.fos.saamdagen.data.block.BlockDeserializer
import be.fos.saamdagen.data.news.NewsItemDeserializer
import be.fos.saamdagen.data.session.SessionDeserializer
import be.fos.saamdagen.model.*
import com.google.gson.GsonBuilder
import com.google.gson.stream.JsonReader
import java.io.InputStream

object SaamdagenDataJsonParser {
    fun parseSaamdagenData(unprocessedData: InputStream): SaamdagenData {
        val jsonReader = JsonReader(unprocessedData.reader())

        val gson = GsonBuilder()
            .registerTypeAdapter(Block::class.java, BlockDeserializer())
            .registerTypeAdapter(Info::class.java,InfoDeserializer())
            .registerTypeAdapter(Session::class.java,SessionDeserializer())
            .registerTypeAdapter(NewsItem::class.java, NewsItemDeserializer())
            .create()

        return gson.fromJson(jsonReader, SaamdagenData::class.java)
    }
}