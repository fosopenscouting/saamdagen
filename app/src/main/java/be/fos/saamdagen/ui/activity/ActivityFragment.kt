package be.fos.saamdagen.ui.activity

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentActivityBinding

class ActivityFragment : Fragment() {

    companion object {
        fun newInstance() = ActivityFragment()
    }

    //UI
    private lateinit var binding: FragmentActivityBinding

    private lateinit var viewModel: ActivityViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentActivityBinding.inflate(inflater,container,false).apply {
            lifecycleOwner = this@ActivityFragment
        }


        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(ActivityViewModel::class.java)
        // TODO: Use the ViewModel
    }

}
