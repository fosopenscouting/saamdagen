package be.fos.saamdagen.model

import java.text.SimpleDateFormat
import java.util.*

private const val formatPattern = "EEEE"

val FORMATTER_MONTH_DAY: SimpleDateFormat = SimpleDateFormat(formatPattern,Locale("nl"))

data class EventDay(val start: Date, val end: Date) {

    fun contains(session: Session) = start <= session.startTime && end >= session.endTime

    fun formatMonthDay(): String = FORMATTER_MONTH_DAY.format(start)
}