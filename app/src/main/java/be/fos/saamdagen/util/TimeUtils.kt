package be.fos.saamdagen.util

import be.fos.saamdagen.model.EventDay
import java.text.SimpleDateFormat

object TimeUtils {

    val dateParser = SimpleDateFormat("yyyy-MM-dd HH:mm")

val EventDays = listOf(
    EventDay(dateParser.parse("2019-09-27 19:00"), dateParser.parse("2019-09-28 05:00")),
    EventDay(dateParser.parse("2019-09-28 07:00"), dateParser.parse("2019-09-29 05:00")),
    EventDay(dateParser.parse("2019-09-29 7:00"), dateParser.parse("2019-09-29 14:30"))
)
}