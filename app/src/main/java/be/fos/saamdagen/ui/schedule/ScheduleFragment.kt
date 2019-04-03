package be.fos.saamdagen.ui.schedule


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentScheduleBinding
import be.fos.saamdagen.util.TimeUtils.EventDays
import kotlinx.android.synthetic.main.fragment_schedule.*


class ScheduleFragment : Fragment() {

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val binding = FragmentScheduleBinding.inflate(inflater, container,false).apply {
            lifecycleOwner = this@ScheduleFragment
        }

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        tabs.setupWithViewPager(viewpager)

        viewpager.adapter = ScheduleAdapter(childFragmentManager)
    }

    inner class ScheduleAdapter(fm: FragmentManager): FragmentPagerAdapter(fm) {
        override fun getItem(position: Int): Fragment = ScheduleDayFragment.newInstance()

        override fun getCount() = EventDays.size

        override fun getPageTitle(position: Int): CharSequence? {
            return EventDays[position].formatMonthDay()
        }

    }


}
