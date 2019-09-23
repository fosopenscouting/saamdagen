package be.fos.saamdagen.ui.map

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.DialogFragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.RecyclerView
import be.fos.saamdagen.R
import be.fos.saamdagen.ui.info.InfoViewModel

class MapVariantSelectionDialogFragment : DialogFragment() {

    private lateinit var adapter: MapVariantAdapter
    private lateinit var mapViewModel: MapViewModel

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        mapViewModel = activity.run { ViewModelProviders.of(this!!).get(MapViewModel::class.java)}
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        return inflater.inflate(R.layout.fragment_map_variant_select,container,false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        adapter = MapVariantAdapter(::selectMapVariant)


        view.findViewById<RecyclerView>(R.id.map_variant_list).adapter = adapter

        mapViewModel.mapVariant.observe(this, Observer {
            adapter.currentSelection = it
        })
    }


    private fun selectMapVariant(mapVariant: MapVariant) {
        Log.d("MAP_","Called selectMapvariant $mapVariant")
        mapViewModel.setMapVariant(mapVariant)
        dismiss()
    }
}