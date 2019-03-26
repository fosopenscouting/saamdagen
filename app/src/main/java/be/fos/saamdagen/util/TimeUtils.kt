package be.fos.saamdagen.util

import be.fos.saamdagen.model.EventDay
import java.text.SimpleDateFormat

object TimeUtils {

    val dateParser = SimpleDateFormat("yyyy-MM-dd HH:mm")

val EventDays = listOf(
    EventDay(dateParser.parse("2019-09-27 19:00"), dateParser.parse("2019-09-28 03:00")),
    EventDay(dateParser.parse("2019-09-28 09:00"), dateParser.parse("2019-09-29 03:00")),
    EventDay(dateParser.parse("2019-09-29 9:00"), dateParser.parse("2019-09-29 14:30"))
)
}