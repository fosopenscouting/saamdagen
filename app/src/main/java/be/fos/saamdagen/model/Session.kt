package be.fos.saamdagen.model

import java.util.*

data class Session(

    /**
     * Title of the Session. Example, 'Groot spel'
     */
    val title: String,

    /**
     * Start time of the session. Date, hour and minutes
     */
    val startTime: Date,

    /**
     * End time of the session. Date, hour and minutes
     */
    val endTime: Date,

    /**
     * Background color of the session. Should be provided as the HEX value of the color.
     */
    val color: String,

    /**
     * Stroke of the session. Defaults to [color]
     */
    val strokeColor: String? = color,

    /**
     * If [color] is dark, text should be white. Defaults to false
     */
    val isDark: Boolean = false,

    /**
     * Type of the item. Exaple: food, activity, workshop,..
     */
    val type: String

)
