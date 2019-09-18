package be.fos.saamdagen.ui.map

import androidx.annotation.DrawableRes
import androidx.annotation.RawRes
import androidx.annotation.StringRes
import be.fos.saamdagen.R

enum class MapVariant(
@StringRes val labelresId: Int,
@DrawableRes val iconResId: Int,
@RawRes markersResId: Int
) {

    NORMAL(
R.string.map_layer_normal,
        R.drawable.ic_nav_map,
        R.raw.map_markers
    ),
    ACTIVITIES(
        R.string.map_layer_activities,
        R.drawable.ic_people,
        R.raw.map_markers
    )
}