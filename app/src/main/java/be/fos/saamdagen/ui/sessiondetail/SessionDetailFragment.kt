package be.fos.saamdagen.ui.sessiondetail

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.navArgs

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentSessionDetailBinding

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

        binding = FragmentSessionDetailBinding.inflate(inflater,container,false).apply {
            lifecycleOwner = this@SessionDetailFragment
        }

        binding.description.text = SessionDetailFragmentArgs.fromBundle(arguments!!).sessionDescription

        val title = SessionDetailFragmentArgs.fromBundle(arguments!!).sessionTitle

        binding.sessionTitle.text = title
        binding.title.text = title
        return binding.root

    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(SessionDetailViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
