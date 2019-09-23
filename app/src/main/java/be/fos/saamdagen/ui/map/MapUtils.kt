package be.fos.saamdagen.ui.map

import android.content.Context
import android.graphics.Bitmap
import androidx.annotation.DrawableRes
import androidx.appcompat.content.res.AppCompatResources
import androidx.core.graphics.drawable.toBitmap
import be.fos.saamdagen.R
import com.google.android.gms.maps.model.BitmapDescriptorFactory
import com.google.maps.android.data.geojson.GeoJsonLayer
import com.google.maps.android.data.geojson.GeoJsonPointStyle
import com.google.maps.android.ui.IconGenerator
import java.util.*

fun processGeoJsonLayer(layer: GeoJsonLayer, context: Context) {

    val iconGenerator = getLabelIconGenerator(context)

    layer.features.forEach { feature ->
        val icon = feature.getProperty("icon")
        val label = feature.getProperty("label") ?: feature.getProperty("name") ?: feature.getProperty("activity_id") ?: feature.getProperty("workshop_id")

        val drawableRes = getDrawableResourceForIcon(context, icon)

        feature.pointStyle = when {
            drawableRes != 0 -> createIconMarker(context, drawableRes, label)
            label != null -> createLabelMarker(iconGenerator, label)
            else -> GeoJsonPointStyle()
        }
    }


}


/** Creates a new IconGenerator for labels on the map. */
 fun getLabelIconGenerator(context: Context): IconGenerator {
    val labelBg = context.getDrawable(R.drawable.map_marker_label_background)
    return IconGenerator(context).apply {
        setTextAppearance(context, R.style.TextAppearance_Saamdagen_Map_MarkerLabel)
        setBackground(labelBg)
    }
}

/**
 * Returns the drawable resource id for an icon marker, or 0 if no resource with this name exists.
 */
@DrawableRes
fun getDrawableResourceForIcon(context: Context, iconType: String?): Int {
    if (iconType == null) {
        return 0
    }
    return context.resources.getIdentifier(
        iconType.toLowerCase(Locale.US),
        "drawable",
        context.packageName
    )
}

/** Creates a GeoJsonPointStyle for a label. */
 fun createLabelMarker(
    iconGenerator: IconGenerator,
    title: String
): GeoJsonPointStyle {
    val icon = BitmapDescriptorFactory.fromBitmap(iconGenerator.makeIcon(title))
    return GeoJsonPointStyle().apply {
        setAnchor(.5f, .5f)
        setIcon(icon)
        // Don't set the title because we don't want to show an InfoWindow, but set the snippet for
        // accessibility services (TalkBack).
        snippet = title
    }
}

/**
 * Creates a GeoJsonPointStyle for a map icon. The icon is chosen based on the marker type and is
 * anchored at the bottom center of the marker's location.
 */
 fun createIconMarker(
    context: Context,
    drawableRes: Int,
    title: String
): GeoJsonPointStyle {
    val bitmap = drawableToBitmap(context, drawableRes)
    val icon = BitmapDescriptorFactory.fromBitmap(bitmap)
    return GeoJsonPointStyle().apply {
        setAnchor(0.5f, 0.5f)
        setTitle(title)
        setIcon(icon)
    }
}

/** Convert a drawable resource to a Bitmap. */
private fun drawableToBitmap(context: Context, @DrawableRes resId: Int): Bitmap {
    return requireNotNull(AppCompatResources.getDrawable(context, resId)).toBitmap()
}
