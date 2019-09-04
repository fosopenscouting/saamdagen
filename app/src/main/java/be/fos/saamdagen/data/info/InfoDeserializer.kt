package be.fos.saamdagen.data.info

import be.fos.saamdagen.model.Info
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

class InfoDeserializer: JsonDeserializer<Info> {
    override fun deserialize(json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?): Info {
        val obj = json?.asJsonObject!!

        return Info(
            title = obj["title"].asString,
            content = obj["content"].asString,
            imageName = obj["imageName"]?.asString

        )
    }

}