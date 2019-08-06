package be.fos.saamdagen.ui.schedule

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.doOnNextLayout
import androidx.recyclerview.widget.LinearLayoutManager

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentScheduleBinding
import be.fos.saamdagen.databinding.ScheduleDayFragmentBinding
import be.fos.saamdagen.model.Session
import be.fos.saamdagen.util.clearDecorations
import be.fos.saamdagen.util.executeAfter
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
        binding = ScheduleDayFragmentBinding.inflate(inflater, container, false).apply {
            lifecycleOwner = this@ScheduleDayFragment
        }

        val layoutManager = LinearLayoutManager(context)

        binding.recyclerview.layoutManager = layoutManager

        adapter = ScheduleDayAdapter()


        binding.recyclerview.adapter = adapter
        initializeList(
            listOf(
                Session("Check-in", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Avondshow", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Check-in", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Avondshow", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Check-in", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Avondshow", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Check-in", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Avondshow", Date(2019, 9, 27, 19, 0), Date(2019, 9, 27, 23, 59)),
                Session("Silent Disco", Date(2019, 9, 27, 21, 0), Date(2019, 9, 28, 1, 0)),
                Session("Late-night snack", Date(2019, 9, 27, 22, 0), Date(2019, 9, 27, 23, 0)),
                Session("Helemaal naar de ballen", Date(2019, 9, 28, 0, 0), Date(2019, 9, 28, 4, 0)),
                Session("Silent Disco", Date(2019, 9, 27, 21, 0), Date(2019, 9, 28, 1, 0)),
                Session("Late-night snack", Date(2019, 9, 27, 22, 0), Date(2019, 9, 27, 23, 0)),
                Session("Helemaal naar de ballen", Date(2019, 9, 28, 0, 0), Date(2019, 9, 28, 4, 0)),
                Session("Silent Disco", Date(2019, 9, 27, 21, 0), Date(2019, 9, 28, 1, 0)),
                Session("Late-night snack", Date(2019, 9, 27, 22, 0), Date(2019, 9, 27, 23, 0)),
                Session("Helemaal naar de ballen", Date(2019, 9, 28, 0, 0), Date(2019, 9, 28, 4, 0)),
                Session("Silent Disco", Date(2019, 9, 27, 21, 0), Date(2019, 9, 28, 1, 0)),
                Session("Late-night snack", Date(2019, 9, 27, 22, 0), Date(2019, 9, 27, 23, 0)),
                Session("Helemaal naar de ballen", Date(2019, 9, 28, 0, 0), Date(2019, 9, 28, 4, 0))

            )
        )


        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.recyclerview.apply {
            (layoutManager as LinearLayoutManager).recycleChildrenOnDetach = true

        }
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(ScheduleDayViewModel::class.java)
        // TODO: Use the ViewModel
    }

    private fun initializeList(sessionTimeData: List<Session>) {
        // Require the list and timeZoneId to be loaded.
        val list = sessionTimeData ?: return

        adapter.submitList(list)

        binding.recyclerview.run {
            // we want this to run after diffing
            doOnNextLayout {
                // Recreate the decoration used for the sticky time headers
                clearDecorations()
                if (list.isNotEmpty()) {
                    addItemDecoration(
                        ScheduleHeadersDecoration(
                            it.context, list.map { it }
                        )
                    )
                }
            }
        }

    }

}
