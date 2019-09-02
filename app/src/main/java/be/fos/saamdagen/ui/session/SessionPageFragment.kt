package be.fos.saamdagen.ui.session


import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.view.doOnNextLayout
import androidx.lifecycle.ViewModelProviders
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentSessionPageBinding
import be.fos.saamdagen.model.Session
import be.fos.saamdagen.model.SessionType
import be.fos.saamdagen.util.clearDecorations


class SessionPageFragment : Fragment() {

    private lateinit var viewModel: SessionViewModel

    private lateinit var adapter: SessionPageAdapter
    private lateinit var binding: FragmentSessionPageBinding

    private val sessionType: String? by lazy {
        val args = arguments ?: throw IllegalStateException("Missing arguments!")
        args.getString(ARG_ACTIVITY_TYPE)
    }


    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        viewModel = ViewModelProviders.of(this).get(SessionViewModel::class.java)

        binding = FragmentSessionPageBinding.inflate(inflater, container, false).apply {
            lifecycleOwner = this@SessionPageFragment
        }

        initializeRecyclerview()

        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        initializeList(viewModel.getSessionsForType(sessionType!!))

    }

    private fun initializeRecyclerview() {
        val layoutManager = LinearLayoutManager(context)

        binding.recyclerview.layoutManager = layoutManager

        adapter = SessionPageAdapter()

        binding.recyclerview.adapter = adapter


    }

    private fun initializeList(sessions: List<Session>) {

        adapter.submitList(sessions)

        binding.recyclerview.run {
            doOnNextLayout {
                clearDecorations()

                if (sessions.isNotEmpty()) {
                    addItemDecoration(SessionHeadersDecoration(it.context, sessions))

                }
            }
        }

        val decoration = ScheduleDividerItemDecoration(requireContext(),DividerItemDecoration.VERTICAL,sessions)
        decoration.setDrawable(requireContext().getDrawable(R.drawable.divider)!!)
        binding.recyclerview.addItemDecoration(
            decoration
            )


    }

    companion object {

        private const val ARG_ACTIVITY_TYPE = "arg.ACTIVITY_TYPE"

        @JvmStatic
        fun newInstance(type: SessionType) =
            SessionPageFragment().apply {
                arguments = Bundle().apply {
                    putString(ARG_ACTIVITY_TYPE, type.code)
                }
            }
    }
}
