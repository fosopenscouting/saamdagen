package be.fos.saamdagen.ui.map

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel

class MapViewModel : ViewModel() {

    private val _mapVariant = MutableLiveData<MapVariant>()
    val mapVariant: LiveData<MapVariant>
        get() = _mapVariant

    fun setMapVariant(mapVariant: MapVariant) {
        _mapVariant.value = mapVariant
    }

}