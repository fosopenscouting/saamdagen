package be.fos.saamdagen.ui.map

import androidx.databinding.BindingAdapter
import be.fos.saamdagen.util.Event
import com.google.android.gms.maps.CameraUpdate
import com.google.android.gms.maps.MapView

@BindingAdapter("mapCenter")
fun mapCenter(mapView: MapView, event: Event<CameraUpdate>?) {
    val update = event?.getContentIfNotHandled() ?: return
    mapView.getMapAsync {
        it.animateCamera(update)
    }
}