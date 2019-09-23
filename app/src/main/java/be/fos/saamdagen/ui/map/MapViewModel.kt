package be.fos.saamdagen.ui.map

import android.content.Context
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.Session
import com.google.android.gms.common.util.MapUtils
import com.google.maps.android.data.geojson.GeoJsonLayer
import com.google.maps.android.data.geojson.GeoJsonPointStyle

class MapViewModel : ViewModel() {

    private val _mapVariant = MutableLiveData<MapVariant>()
    val mapVariant: LiveData<MapVariant>
        get() = _mapVariant

    private val saamdagenDataRepository = SaamdagenDataRepository(JsonSaamdagenDataSource)



    fun setMapVariant(mapVariant: MapVariant) {
        _mapVariant.value = mapVariant
    }


    fun processGeoJsonLayer(layer: GeoJsonLayer, context: Context) {

        val iconGenerator = getLabelIconGenerator(context)

        layer.features.forEach { feature ->
            val icon = feature.getProperty("icon")

            val label = when {
                feature.getProperty("activity_id") != null -> saamdagenDataRepository.getActivityById(feature.getProperty(("activity_id")).toInt()).mapTitle()
                feature.getProperty("workshop_id") != null -> saamdagenDataRepository.getWorkshopById(feature.getProperty(("workshop_id")).toInt()).mapTitle()
                else -> feature.getProperty("label") ?: feature.getProperty("name")

            }

            //val label = feature.getProperty("label") ?: feature.getProperty("name") ?: feature.getProperty("activity_id") ?: feature.getProperty("workshop_id")

            val drawableRes = getDrawableResourceForIcon(context, icon)

            feature.pointStyle = when {
                drawableRes != 0 -> createIconMarker(context, drawableRes, label)
                label != null -> createLabelMarker(iconGenerator, label)
                else -> GeoJsonPointStyle()
            }
        }


    }

}