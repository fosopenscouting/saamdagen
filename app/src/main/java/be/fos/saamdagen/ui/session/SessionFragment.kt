package be.fos.saamdagen.ui.session

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import be.fos.saamdagen.databinding.FragmentSessionBinding
import be.fos.saamdagen.model.SessionType
import kotlinx.android.synthetic.main.fragment_session.*

class  SessionFragment : Fragment() {

    //UI
    private lateinit var binding: FragmentSessionBinding

    private lateinit var viewModel: SessionViewModel

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentSessionBinding.inflate(inflater,container,false).apply {
            lifecycleOwner = this@SessionFragment
        }


        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        tabs.setupWithViewPager(viewpager)

        viewpager.adapter = ActivityAdapter(childFragmentManager)
    }

    inner class ActivityAdapter(fm: FragmentManager): FragmentPagerAdapter(fm) {

        //TODO: opzoeken of dit wel ok is. Seems fishy.
        private val types = arrayOf(SessionType("Activiteiten","activiteit"), SessionType("Workshops","workshop"))
        override fun getItem(position: Int): Fragment = SessionPageFragment.newInstance(types[position])

        override fun getCount(): Int {
            return types.size
        }

        override fun getPageTitle(position: Int): CharSequence? {
            return types[position].displayName
        }

    }

}
