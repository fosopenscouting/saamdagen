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
    private lateinit var adapter: NewsItemAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        viewModel = ViewModelProviders.of(this).get(HomeViewModel::class.java)
        binding = FragmentHomeBinding.inflate(inflater,container,false).apply {
            lifecycleOwner = this@HomeFragment
        }

        binding.actionButton.setOnClickListener {
            it.findNavController().navigate(R.id.action_news_schedule)
        }

        initializeNewsRecyclerview()

        adapter.submitList(viewModel.newsItems)

        return binding.root
    }

    private fun initializeNewsRecyclerview() {
        val layoutManager = LinearLayoutManager(context)

        binding.newsitems.layoutManager = layoutManager

         adapter = NewsItemAdapter()

        binding.newsitems.adapter = adapter
    }

}
