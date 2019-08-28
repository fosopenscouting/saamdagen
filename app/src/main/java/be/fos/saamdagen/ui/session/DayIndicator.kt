package be.fos.saamdagen.ui.session

import be.fos.saamdagen.model.EventDay

class DayIndicator(val day: EventDay, val checked: Boolean = false, val enabled: Boolean = false) {

    // Only the day is used for equality
    override fun equals(other: Any?): Boolean =
        this === other || (other is DayIndicator && day == other.day)

    // Only the day is used for equality
    override fun hashCode(): Int = day.hashCode()

    fun areUiContentsTheSame(other: DayIndicator): Boolean {
        return checked == other.checked && enabled == other.enabled
    }
}