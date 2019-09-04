package be.fos.saamdagen.data.block

import be.fos.saamdagen.model.Block
import com.google.gson.JsonDeserializationContext
import com.google.gson.JsonDeserializer
import com.google.gson.JsonElement
import java.lang.reflect.Type
import java.text.SimpleDateFormat
import java.util.*

class BlockDeserializer: JsonDeserializer<Block> {
    override fun deserialize(json: JsonElement?, typeOfT: Type?, context: JsonDeserializationContext?): Block {
        val obj = json?.asJsonObject!!

        val dateFormatter = SimpleDateFormat("yyy-MM-dd HH:mm")
        val startTime = dateFormatter.parse(obj["startTime"].asString)
        val endObject = obj["endTime"]
        var endTime: Date? = null
        if(endObject != null)
        {
            endTime = dateFormatter.parse(endObject.asString)
        }

        return Block(
            title = obj.get("title").asString,
            startTime = startTime,
            endTime = endTime,
            color = obj["color"].asString,
            strokeColor = obj["strokeColor"].asString,
            isDark = obj["isDark"].asBoolean,
            type = obj["type"].asString
        )
    }
}