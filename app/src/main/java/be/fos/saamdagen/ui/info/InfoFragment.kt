package be.fos.saamdagen.ui.info


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentInfoBinding
import be.fos.saamdagen.ui.info.about.AboutFragment
import be.fos.saamdagen.ui.info.news.NewsFragment
import be.fos.saamdagen.ui.info.settings.SettingsFragment
import kotlinx.android.synthetic.main.fragment_info.*


class InfoFragment : Fragment() {

    private lateinit var binding: FragmentInfoBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        binding = FragmentInfoBinding.inflate(inflater, container, false).apply {
            lifecycleOwner = this@InfoFragment
        }
        // Inflate the layout for this fragment
        return binding.root
    }


}
