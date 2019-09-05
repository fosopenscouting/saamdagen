package be.fos.saamdagen.ui.home

import androidx.lifecycle.ViewModelProviders
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.findNavController
import androidx.recyclerview.widget.LinearLayoutManager

import be.fos.saamdagen.R
import be.fos.saamdagen.databinding.FragmentHomeBinding
import be.fos.saamdagen.model.NewsItem
import kotlinx.android.synthetic.main.fragment_home.view.*

class HomeFragment : Fragment() {

    companion object {
        fun newInstance() = HomeFragment()
    }

    private lateinit var viewModel: HomeViewModel

    private lateinit var binding: FragmentHomeBinding

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentHomeBinding.inflate(inflater,container,false).apply {
            lifecycleOwner = this@HomeFragment
        }

        binding.actionButton.setOnClickListener {
            it.findNavController().navigate(R.id.action_news_schedule)
        }

        initializeNewsRecyclerview()

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProviders.of(this).get(HomeViewModel::class.java)
        // TODO: Use the ViewModel
    }

    private fun initializeNewsRecyclerview() {
        val layoutManager = LinearLayoutManager(context)

        binding.newsitems.layoutManager = layoutManager

        val adapter = NewsItemAdapter()

        binding.newsitems.adapter = adapter

        adapter.submitList(listOf(
            NewsItem("Test", "Content",null),
            NewsItem("Test 2", "Lorem Ipsum is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. Het heeft niet alleen vijf eeuwen overleefd maar is ook, vrijwel onveranderd, overgenomen in elektronische letterzetting. Het is in de jaren '60 populair geworden met de introductie van Letraset vellen met Lorem Ipsum passages en meer recentelijk door desktop publishing software zoals Aldus PageMaker die versies van Lorem Ipsum bevatten.",null)
        ))
    }

}
