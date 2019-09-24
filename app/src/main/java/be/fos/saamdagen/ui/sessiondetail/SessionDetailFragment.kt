package be.fos.saamdagen.ui.sessiondetail

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.findNavController
import androidx.navigation.fragment.findNavController
import androidx.navigation.fragment.navArgs

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentSessionDetailBinding
import be.fos.saamdagen.ui.map.MapVariant
import com.microsoft.appcenter.analytics.Analytics

class SessionDetailFragment : Fragment() {

    private lateinit var binding: FragmentSessionDetailBinding


    companion object {
        fun newInstance() = SessionDetailFragment()
    }

    private lateinit var viewModel: SessionDetailViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel = ViewModelProviders.of(this).get(SessionDetailViewModel::class.java)
        binding = FragmentSessionDetailBinding.inflate(inflater,container,false).apply {
            lifecycleOwner = this@SessionDetailFragment
        }

        val sessionId = SessionDetailFragmentArgs.fromBundle(arguments!!).sessionId

        val session = viewModel.getSession(sessionId)

        activity!!.title = session.title

        binding.session = session

        binding.toMapFab.setOnClickListener {
            val action = SessionDetailFragmentDirections.actionSessionDetailFragmentToNavigationMap(MapVariant.ACTIVITIES.name, sessionId)
            findNavController().navigate(action)
        }

        val properties = HashMap<String,String>()
        properties["Sessie titel"] = session.title

        Analytics.trackEvent("Session detail opened", properties)

        return binding.root

    }


}
