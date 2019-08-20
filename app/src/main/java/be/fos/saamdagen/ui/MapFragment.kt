package be.fos.saamdagen.ui

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import be.fos.saamdagen.R
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.LatLng
import kotlinx.android.synthetic.main.fragment_map.*
import kotlinx.android.synthetic.main.fragment_map.view.*


class MapFragment : Fragment() {

    private lateinit var mapView: MapView

    private val position = LatLng(51.151006,3.881024)

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        var view =
        // Inflate the layout for this fragment
         inflater.inflate(R.layout.fragment_map, container, false)

        this.mapView = view.map
        with(this.mapView) {
            onCreate(null)
            getMapAsync {
                MapsInitializer.initialize(context)
                setMapLocation(it)
            }
        }

        return view;
    }

    private fun setMapLocation(map: GoogleMap) {
        with(map) {
            moveCamera(CameraUpdateFactory.newLatLngZoom(position,17f))
        }
    }
    override fun onResume() {
        super.onResume()
        mapView.onResume()
    }

    override fun onPause() {
        super.onPause()
        mapView.onPause()
    }

    override fun onDestroy() {
        super.onDestroy()
        mapView.onDestroy()
    }

    override fun onLowMemory() {
        super.onLowMemory()
        mapView.onLowMemory()
    }

}
