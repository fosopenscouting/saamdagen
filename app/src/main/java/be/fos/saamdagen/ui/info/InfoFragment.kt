package be.fos.saamdagen.ui.info

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.lifecycle.ViewModelProviders
import be.fos.saamdagen.databinding.FragmentInfoBinding
import be.fos.saamdagen.model.Info
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.microsoft.appcenter.AppCenter
import com.microsoft.appcenter.analytics.Analytics
import kotlinx.android.synthetic.main.fragment_info.*


class InfoFragment : Fragment() {

    private lateinit var binding: FragmentInfoBinding

    private lateinit var viewModel: InfoViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        Analytics.trackEvent("Info geopend")

        viewModel = ViewModelProviders.of(this).get(InfoViewModel::class.java)
        binding = FragmentInfoBinding.inflate(inflater, container, false).apply {
            lifecycleOwner = this@InfoFragment
        }

        initializeRecyclerview()

        return binding.root
    }

    private fun initializeRecyclerview() {
        val layoutManager = LinearLayoutManager(context)

        binding.infoList.layoutManager = layoutManager

        val dividerItemDecoration = DividerItemDecoration(
            binding.infoList.context,
            layoutManager.orientation
        )
        binding.infoList.addItemDecoration(dividerItemDecoration)

        val adapter = InfoAdapter()

        adapter.submitList(viewModel.info)

        binding.infoList.adapter = adapter
    }


}
