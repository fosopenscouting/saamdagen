package be.fos.saamdagen.ui.map

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.maps.android.data.geojson.GeoJsonLayer
import com.google.maps.android.data.geojson.GeoJsonPointStyle

class MapViewModel : ViewModel() {

    private val _mapVariant = MutableLiveData<MapVariant>()
    val mapVariant: LiveData<MapVariant>
        get() = _mapVariant

    private val saamdagenDataRepository = SaamdagenDataRepository(JsonSaamdagenDataSource)

    private val _bottomSheetState = MutableLiveData<Int>()

    val bottomSheetState: LiveData<Int>
        get() = _bottomSheetState

init {
    _bottomSheetState.value = BottomSheetBehavior.STATE_HIDDEN
}


    fun setMapVariant(mapVariant: MapVariant) {
        _mapVariant.value = mapVariant
    }


    fun processGeoJsonLayer(layer: GeoJsonLayer, context: Context) {

        val iconGenerator = getLabelIconGenerator(context)

        layer.features.forEach { feature ->
            val icon = feature.getProperty("icon")

            val label = when {
                feature.getProperty("id") != null -> saamdagenDataRepository.getSessionById(feature.getProperty(("id"))).mapTitle()
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