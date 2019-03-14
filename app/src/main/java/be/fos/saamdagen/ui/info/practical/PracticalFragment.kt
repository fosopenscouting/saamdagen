package be.fos.saamdagen.ui.info.practical

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import be.fos.saamdagen.R

class PracticalFragment : Fragment() {

    companion object {
        fun newInstance() = PracticalFragment()
    }

    private lateinit var viewModel: PracticalViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.practical_fragment, container, false)
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(PracticalViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
