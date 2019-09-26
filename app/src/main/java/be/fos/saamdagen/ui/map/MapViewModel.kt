package be.fos.saamdagen.ui.map

import android.content.Context
import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations.distinctUntilChanged
import androidx.lifecycle.ViewModel
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.util.Event
import com.google.android.gms.maps.CameraUpdate
import com.google.android.gms.maps.CameraUpdateFactory
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.maps.android.data.geojson.GeoJsonFeature
import com.google.maps.android.data.geojson.GeoJsonLayer
import com.google.maps.android.data.geojson.GeoJsonPoint
import com.google.maps.android.data.geojson.GeoJsonPointStyle

class MapViewModel : ViewModel() {

    private var hasLoadedFeatures = false

    private var requestedFeatureId: String? = null

    private val _mapVariant = MutableLiveData<MapVariant>()
    val mapVariant: LiveData<MapVariant>
        get() = _mapVariant

    private val saamdagenDataRepository = SaamdagenDataRepository



   private  lateinit var  geoJsonLayer: GeoJsonLayer

    private val _cameraUpdate = MutableLiveData<Event<CameraUpdate>>()
    val cameraUpdate: LiveData<Event<CameraUpdate>>
        get() = _cameraUpdate





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


     fun setMapFeatures(geoJsonLayer: GeoJsonLayer) {
        this.geoJsonLayer = geoJsonLayer

        // if we have a pending request to highlight a feature, resolve it now
        val featureId = requestedFeatureId ?: return
        requestedFeatureId = null
        highlightFeature(featureId)
    }

    fun requestHighlightFeature(featureId: String) {
        if (hasLoadedFeatures) {
            highlightFeature(featureId)
        } else {
            // save and re-evaluate when the map features are loaded
            requestedFeatureId = featureId
        }
    }

    fun highlightFeature(featureId: String) {


        val feature = geoJsonLayer.features.first { feature -> feature.getProperty("id") == featureId } ?: return
        val geometry = feature.geometry as? GeoJsonPoint ?: return
        // center map on the requested feature.
        val update = CameraUpdateFactory.newLatLngZoom(geometry.coordinates, 19f)
        _cameraUpdate.value = Event(update)

        requestedFeatureId = null


    }

}