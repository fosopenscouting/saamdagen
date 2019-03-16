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
import be.fos.saamdagen.ui.info.practical.PracticalFragment
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

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.run {
            //Setup the viewpager
            viewpager.offscreenPageLimit = INFO_PAGES.size
            viewpager.adapter = InfoAdapter(childFragmentManager)
            tabs.setupWithViewPager(binding.viewpager)
        }

    }


    // Adapter for adding fragments to the viewpager
    inner class InfoAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {
        override fun getCount() = INFO_PAGES.size
        override fun getItem(position: Int) = INFO_PAGES[position]()

        override fun getPageTitle(position: Int): CharSequence {
            return resources.getString(INFO_TITLES[position])
        }

    }

    companion object {

        private val TAG: String = InfoFragment::class.java.simpleName

        //Titles displayed in the tabLayout, titles are passed to the tablayout trough the InfoAdapter
        private val INFO_TITLES = arrayOf(
            R.string.news_title,
            R.string.practical_title,
            R.string.about_title,
            R.string.settings_title

        )
        //Array of all the fragments displayed in the viewpager
        private val INFO_PAGES = arrayOf(
            { NewsFragment() },
            { PracticalFragment() },
            { AboutFragment() },
            { SettingsFragment() }
        )
    }
}
