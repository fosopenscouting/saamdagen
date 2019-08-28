package be.fos.saamdagen.ui.schedule

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.doOnNextLayout
import androidx.recyclerview.widget.LinearLayoutManager

import be.fos.saamdagen.databinding.ScheduleDayFragmentBinding
import be.fos.saamdagen.model.Block
import be.fos.saamdagen.util.TimeUtils
import be.fos.saamdagen.util.clearDecorations

class ScheduleDayFragment : Fragment() {

    companion object {
        private const val TAG = "ScheduleDayFragment"
        private const val ARG_EVENT_DAY = "arg.EVENT_DAY"
        fun newInstance(day:Int) :ScheduleDayFragment {
            //Passes the current event day to the fragment
            val args = Bundle().apply {
                putInt(ARG_EVENT_DAY,day)
            }

            return ScheduleDayFragment().apply { arguments = args }
        }
}

    private lateinit var viewModel: ScheduleViewModel

    private lateinit var adapter: ScheduleDayAdapter
    private lateinit var binding: ScheduleDayFragmentBinding

    private val conferenceDay: Int by lazy {
        val args = arguments ?: throw IllegalStateException("Missing arguments!")
        args.getInt(ARG_EVENT_DAY)
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel = ViewModelProviders.of(this).get(ScheduleViewModel::class.java)

        binding = ScheduleDayFragmentBinding.inflate(inflater, container, false).apply {
            lifecycleOwner = this@ScheduleDayFragment
        }

        val layoutManager = LinearLayoutManager(context)

        binding.recyclerview.layoutManager = layoutManager

        adapter = ScheduleDayAdapter()

        binding.recyclerview.adapter = adapter

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.recyclerview.apply {
            (layoutManager as LinearLayoutManager).recycleChildrenOnDetach = true
        }

        initializeList(
            viewModel.getSessionsForDay(TimeUtils.EventDays[conferenceDay])
        )
    }

    /**
     * Pass data to the list and setup the header decorations
     */
    private fun initializeList(blockTimeData: List<Block>) {
        // Require the list and timeZoneId to be loaded.
        adapter.submitList(blockTimeData)

        binding.recyclerview.run {
            // we want this to run after diffing
            doOnNextLayout {
                // Recreate the decoration used for the sticky time headers
                clearDecorations()
                if (blockTimeData.isNotEmpty()) {
                    addItemDecoration(
                        ScheduleHeadersDecoration(
                            it.context, blockTimeData.map { it }
                        )
                    )
                }
            }
        }

    }

}
