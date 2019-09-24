package be.fos.saamdagen.data.session

import be.fos.saamdagen.model.Session
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type

class SessionDeserializer: JsonDeserializer<Session> {
    override fun deserialize(json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?): Session {
        val obj = json?.asJsonObject!!

        return Session(
            id = obj["id"].asString,
            title = obj["title"].asString,
            type = obj["type"].asString,
            description = obj["description"].asString,
            location = obj["location"].asString
        )
    }

}