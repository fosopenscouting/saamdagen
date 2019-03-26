package be.fos.saamdagen.ui.schedule

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import be.fos.saamdagen.R

class ScheduleDayFragment : Fragment() {

    companion object {
        fun newInstance() = ScheduleDayFragment()
    }

    private lateinit var viewModel: ScheduleDayViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.schedule_day_fragment, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(ScheduleDayViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
