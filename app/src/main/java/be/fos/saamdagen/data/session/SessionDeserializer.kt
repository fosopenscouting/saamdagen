package be.fos.saamdagen.data.session

import be.fos.saamdagen.model.Participant
import be.fos.saamdagen.model.Session
import com.google.gson.Gson
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import com.google.gson.reflect.TypeToken
import java.lang.reflect.Type

class SessionDeserializer: JsonDeserializer<Session> {
    override fun deserialize(json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?): Session {
        val obj = json?.asJsonObject!!

        val listType = object : TypeToken<List<Participant>>(){}.type
        val participants = Gson().fromJson<List<Participant>>(obj["participants"].asJsonArray, listType)
        return Session(
            id = obj["id"].asString,
            title = obj["title"].asString,
            type = obj["type"].asString,
            description = obj["description"].asString,
            location = obj["location"].asString,
            participants = participants
        )
    }

}