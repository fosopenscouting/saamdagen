package be.fos.saamdagen.ui.map

import android.Manifest
import android.app.Activity
import android.content.pm.PackageManager
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import be.fos.saamdagen.R
import com.google.android.gms.maps.*
import com.google.android.gms.maps.model.LatLng
import kotlinx.android.synthetic.main.fragment_map.view.*
import android.util.Log
import androidx.appcompat.app.AlertDialog
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.ViewModelProviders
import be.fos.saamdagen.databinding.FragmentMapBinding
import com.google.android.gms.maps.model.LatLngBounds
import com.google.android.gms.maps.model.MapStyleOptions
import com.google.maps.android.data.geojson.GeoJsonLayer
import com.microsoft.appcenter.analytics.Analytics
import kotlinx.android.synthetic.main.fragment_map.*


class MapFragment : Fragment() {

    private lateinit var mapView: MapView
    private lateinit var googleMap: GoogleMap

    private val position = LatLng(51.151006, 3.881024)

    private lateinit var binding: FragmentMapBinding
    private lateinit var viewModel: MapViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        Analytics.trackEvent("Grondplan geopend")

        viewModel = activity.run { ViewModelProviders.of(this!!).get(MapViewModel::class.java)}

       binding = FragmentMapBinding.inflate(inflater, container,false)

        this.mapView = binding.map
        checkLocationPermission()
        with(this.mapView) {
            onCreate(null)
            getMapAsync {
                googleMap = it
                MapsInitializer.initialize(context)
                setMapLocation(it)
                googleMap.setMapStyle(MapStyleOptions.loadRawResourceStyle(requireContext(), R.raw.map_style))
                googleMap.uiSettings.isMyLocationButtonEnabled = false

                val geoJsonLayer = GeoJsonLayer(googleMap, R.raw.map_markers,context)
                processGeoJsonLayer(geoJsonLayer,requireContext())
                geoJsonLayer.addLayerToMap()
                if (ContextCompat.checkSelfPermission(
                        requireContext(),
                        Manifest.permission.ACCESS_FINE_LOCATION
                    )
                    == PackageManager.PERMISSION_GRANTED
                ) {

                    googleMap.isMyLocationEnabled = true


                }
            }
        }

        viewModel.mapVariant.observe(this, Observer {
            Log.d("MAP_FRAGMENT",it.toString())
            mapView.getMapAsync {googleMap ->
                googleMap.clear()
                val geoJsonLayer = GeoJsonLayer(googleMap, it.markersResId,context)
                processGeoJsonLayer(geoJsonLayer,requireContext())
                geoJsonLayer.addLayerToMap()
            }
        })


    MapFragmentArgs.fromBundle(arguments?: Bundle.EMPTY).run {
        val variant = when {
            mapVariant != null -> MapVariant.valueOf(mapVariant)
            else -> MapVariant.NORMAL
        }
        viewModel.setMapVariant(variant)
    }



        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.mapModeFab.setOnClickListener {
            MapVariantSelectionDialogFragment().show(childFragmentManager, "MAP_MODE_DIALOG")
        }
    }



    private fun setMapLocation(map: GoogleMap) {
        with(map) {
            val bounds = LatLngBounds(
                LatLng(51.148220, 3.875542),
                LatLng(51.153382, 3.886110)
            )
            setMinZoomPreference(16f)
            setLatLngBoundsForCameraTarget(bounds)
            moveCamera(CameraUpdateFactory.newLatLngZoom(position, 17f))
        }
    }


    val MY_PERMISSIONS_REQUEST_LOCATION = 99

    private fun checkLocationPermission(): Boolean {
        if (ContextCompat.checkSelfPermission(
                requireContext(),
                Manifest.permission.ACCESS_FINE_LOCATION
            ) != PackageManager.PERMISSION_GRANTED
        ) {

            // Should we show an explanation?
            if (ActivityCompat.shouldShowRequestPermissionRationale(
                    activity as Activity,
                    Manifest.permission.ACCESS_FINE_LOCATION
                )
            ) {

                // Show an explanation to the user *asynchronously* -- don't block
                // this thread waiting for the user's response! After the user
                // sees the explanation, try again to request the permission.
                AlertDialog.Builder(requireContext())
                    .setTitle("Locatie")
                    .setMessage("Message")
                    .setPositiveButton("OK") { _, _ ->
                        //Prompt the user once explanation has been shown
                        ActivityCompat.requestPermissions(
                            activity as Activity,
                            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                            MY_PERMISSIONS_REQUEST_LOCATION
                        )
                    }
                    .create()
                    .show()


            } else {
                // No explanation needed, we can request the permission.
                ActivityCompat.requestPermissions(
                    activity as Activity,
                    arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
                    MY_PERMISSIONS_REQUEST_LOCATION
                )
            }
            return false
        } else {
            return true
        }
    }

    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<String>, grantResults: IntArray
    ) {
        when (requestCode) {
            MY_PERMISSIONS_REQUEST_LOCATION -> {

                val permissionGranted = grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED
                // If request is cancelled, the result arrays are empty.
                if (permissionGranted) {


                    // permission was granted, yay! Do the
                    // location-related task you need to do.

                    if (ContextCompat.checkSelfPermission(
                            requireContext(),
                            Manifest.permission.ACCESS_FINE_LOCATION
                        ) == PackageManager.PERMISSION_GRANTED
                    ) {

                        googleMap.isMyLocationEnabled = true
                        //Request location updates:
                        // locationManager.requestLocationUpdates(provider, 400, 1, this)
                    }

                } else {

                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.

                }

                val properties = HashMap<String,String>()
                properties["Granted"] = permissionGranted.toString()

                Analytics.trackEvent("Location permission", properties)
                return
            }
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
