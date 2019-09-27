package be.fos.saamdagen.ui


import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProviders

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentSessionParticipantBinding
import be.fos.saamdagen.ui.map.MapViewModel
import be.fos.saamdagen.ui.session.SessionParticipantAdapter
import be.fos.saamdagen.ui.session.SessionViewModel

/**
 * A simple [Fragment] subclass.
 */
class SessionParticipantFragment : Fragment() {
private lateinit var viewModel: SessionViewModel

    private lateinit var adapter: SessionParticipantAdapter
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        viewModel = activity.run { ViewModelProviders.of(this!!).get(SessionViewModel::class.java) }
        // Inflate the layout for this fragment
        val binding = FragmentSessionParticipantBinding.inflate(LayoutInflater.from(context!!),container,false).apply {
            viewModel = this@SessionParticipantFragment.viewModel
        }

        val adapter = SessionParticipantAdapter()

        activity!!.title = "Jouw sessies"

        binding.recyclerview.adapter = adapter

        viewModel.participantSessions.observe(this, Observer {
            Log.d("SESSION_FRAG", it.toString())
            adapter.submitList(it)
        })



        return binding.root
    }


}
