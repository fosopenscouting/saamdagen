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
            Info("Infopunt", "Op Saamdagen staat het infopunt altijd voor je klaar.\n" +
                    "Je koopt er bekers en bonnen, je vindt er condooms en " +
                    "oordopjes, een gsm-oplaadstation, verloren voorwerpen, wcpapier " +
                    "en gezellige mensen erbovenop! Zit je met een vraag " +
                    "of wil je gewoon eens babbelen? Dan is het infopunt the place " +
                    "to be! Is het infopunt gesloten, maar heb je toch een heel " +
                    "dringende vraag/probleem?\n" +
                    "Bel dan even de " +
                    "Saamdagenfoon: 0475 83 33 96!"),
            Info("Groot spel","Iedereen speelt wel eens met buisjes en balletjes, maar " +
                    "wat er deze zaterdagochtend zal gebeuren is ongezien.\n" +
                    "700 FOSsers gaan de strijd aan met elkaar in een " +
                    "mega episch blaaspijpenspel.. MET DANK AAN 200e " +
                    "FOS DE VLEERMUIS!!"),
            Info("Uitcheck","Op zondag popel je natuurlijk om terug te keren naar " +
                    "de mammie en de pappie. Je kan niet wachten tot " +
                    "je al je Saam-avonturen kan toevertrouwen aan je " +
                    "liefste dagboek. Toch gaat de uitcheck pas open als " +
                    "alles voldoende is afgebroken en opgeruimd.\nRichtuur " +
                    "14u30!"),
            Info("Infopunt", "Op Saamdagen staat het infopunt altijd voor je klaar.\n" +
                    "Je koopt er bekers en bonnen, je vindt er condooms en " +
                    "oordopjes, een gsm-oplaadstation, verloren voorwerpen, wcpapier " +
                    "en gezellige mensen erbovenop! Zit je met een vraag " +
                    "of wil je gewoon eens babbelen? Dan is het infopunt the place " +
                    "to be! Is het infopunt gesloten, maar heb je toch een heel " +
                    "dringende vraag/probleem?\n" +
                    "Bel dan even de " +
                    "Saamdagenfoon: 0475 83 33 96!"),
            Info("Groot spel","Iedereen speelt wel eens met buisjes en balletjes, maar " +
                    "wat er deze zaterdagochtend zal gebeuren is ongezien.\n" +
                    "700 FOSsers gaan de strijd aan met elkaar in een " +
                    "mega episch blaaspijpenspel.. MET DANK AAN 200e " +
                    "FOS DE VLEERMUIS!!"),
            Info("Uitcheck","Op zondag popel je natuurlijk om terug te keren naar " +
                    "de mammie en de pappie. Je kan niet wachten tot " +
                    "je al je Saam-avonturen kan toevertrouwen aan je " +
                    "liefste dagboek. Toch gaat de uitcheck pas open als " +
                    "alles voldoende is afgebroken en opgeruimd.\nRichtuur " +
                    "14u30!")))

        binding.infoList.adapter = adapter
        // Inflate the layout for this fragment
        return binding.root
    }


}
