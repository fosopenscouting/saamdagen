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
     * Background color of the session
     */
    val color: Int,

    /**
     * Stroke of the session. Defaults to [color]
     */
    val strokeColor: Int? = color,

    /**
     * If [color] is dark, text should be white. Defaults to false
     */
    val isDark: Boolean = false,

    /**
     * Type of the item. Exaple: food, activity, workshop,..
     */
    val type: String

)
