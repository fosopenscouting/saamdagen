package be.fos.saamdagen.ui.session

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.FragmentManager
import androidx.fragment.app.FragmentPagerAdapter
import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentSessionBinding
import be.fos.saamdagen.model.SessionType
import com.microsoft.appcenter.analytics.Analytics
import kotlinx.android.synthetic.main.fragment_session.*

import androidx.navigation.fragment.findNavController

import com.google.android.material.snackbar.Snackbar
import kotlinx.android.synthetic.main.dialog_search.view.*


class SessionFragment : Fragment() {

    //UI
    private lateinit var binding: FragmentSessionBinding

    private lateinit var viewModel: SessionViewModel

    private lateinit var adapter: SessionParticipantAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        viewModel = activity.run { ViewModelProviders.of(this!!).get(SessionViewModel::class.java) }
        binding = FragmentSessionBinding.inflate(inflater, container, false).apply {
            lifecycleOwner = this@SessionFragment
        }

        Analytics.trackEvent("Activiteiten geopend")

         adapter = SessionParticipantAdapter()


        binding.searchFab.setOnClickListener {
            showSearchDialog()

        }



        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        tabs.setupWithViewPager(viewpager)

        viewpager.adapter = ActivityAdapter(childFragmentManager)
    }

    inner class ActivityAdapter(fm: FragmentManager) : FragmentPagerAdapter(fm) {

        //TODO: opzoeken of dit wel ok is. Seems fishy.
        private val types =
            arrayOf(SessionType("Activiteiten", "activiteit"), SessionType("Workshops", "workshop"))

        override fun getItem(position: Int): Fragment =
            SessionPageFragment.newInstance(types[position])

        override fun getCount(): Int {
            return types.size
        }

        override fun getPageTitle(position: Int): CharSequence? {
            return types[position].displayName
        }

    }


    private fun showSearchDialog() {
        val builder = AlertDialog.Builder(context!!)

        builder.setTitle("Jouw sessies zoeken")

        val inflatedView = LayoutInflater.from(context!!)
            .inflate(R.layout.dialog_search, view as ViewGroup, false)


        builder.setView(inflatedView)

        // Set up the buttons
        builder.setPositiveButton(
            android.R.string.ok
        ) { dialog, which ->
            dialog.dismiss()
         val success =  viewModel.findSessionsFor(inflatedView.input.text.toString())

            if (success) {
                findNavController().navigate(R.id.action_navigation_session_to_sessionParticipantFragment)

            } else {
                Snackbar.make(binding.searchFab,"Er werd geen deelnemer met deze naam gevonden.", Snackbar.LENGTH_LONG).show()
            }
        }
        builder.setNegativeButton(
            android.R.string.cancel
        ) { dialog, which -> dialog.cancel() }

        builder.show()
    }



}
