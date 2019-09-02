package be.fos.saamdagen.ui.schedule

import be.fos.saamdagen.model.Block
import java.util.*

//TODO: find beter way to get hours and minutes
fun indexBlockHeaders(blocks: List<Block>): List<Pair<Int, Date>> {
    return blocks
        .mapIndexed { index, session ->
            index to session.startTime
        }
        .distinctBy { it.second.hours to it.second.minutes }
}