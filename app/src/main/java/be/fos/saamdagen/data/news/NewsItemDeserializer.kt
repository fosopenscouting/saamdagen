package be.fos.saamdagen.data.news

import be.fos.saamdagen.model.NewsItem
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

class NewsItemDeserializer: JsonDeserializer<NewsItem> {
    override fun deserialize(
        json: JsonElement?,
        typeOfT: Type?,
        context: JsonDeserializationContext?
    ): NewsItem {
        val obj = json?.asJsonObject!!

        return NewsItem(
            title = obj["title"].asString,
            content = obj["content"].asString,
            imageName = obj["imageName"]?.asString
        )
    }
}