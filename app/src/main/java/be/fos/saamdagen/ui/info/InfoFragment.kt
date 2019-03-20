package be.fos.saamdagen.ui.info

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import be.fos.saamdagen.databinding.FragmentInfoBinding
import be.fos.saamdagen.model.Info
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
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

        val layoutManager = LinearLayoutManager(context)

        binding.infoList.layoutManager = layoutManager

        val dividerItemDecoration = DividerItemDecoration(
            binding.infoList.context,
            layoutManager.orientation
        )
        binding.infoList.addItemDecoration(dividerItemDecoration)

        val adapter = InfoAdapter()

        adapter.submitList(listOf(
            Info("Saamregels","Hier komen de Saamregels"),
            Info("In en uitcheck", "Hier ook content")))

        binding.infoList.adapter = adapter
        // Inflate the layout for this fragment
        return binding.root
    }


}
