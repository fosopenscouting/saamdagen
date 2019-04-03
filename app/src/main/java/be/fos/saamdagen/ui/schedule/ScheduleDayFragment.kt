package be.fos.saamdagen.ui.schedule

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentScheduleBinding
import be.fos.saamdagen.databinding.ScheduleDayFragmentBinding
import be.fos.saamdagen.model.Session
import java.util.*

class ScheduleDayFragment : Fragment() {

    companion object {
        fun newInstance() = ScheduleDayFragment()
    }

    private lateinit var viewModel: ScheduleDayViewModel

    private lateinit var adapter: ScheduleDayAdapter
    private lateinit var binding: ScheduleDayFragmentBinding


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = ScheduleDayFragmentBinding.inflate(inflater,container,false).apply {
            lifecycleOwner = this@ScheduleDayFragment
        }

        val layoutManager = LinearLayoutManager(context)

        binding.recyclerview.layoutManager = layoutManager

        val adapter = ScheduleDayAdapter()


        binding.recyclerview.adapter = adapter
        adapter.submitList(
            listOf(
                Session("Check-in", Date(2019,9,27,19,0),Date(2019,9,27,23,59))
            ))
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(ScheduleDayViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
