package be.fos.saamdagen.ui

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import be.fos.saamdagen.BuildConfig
import be.fos.saamdagen.R
import com.microsoft.appcenter.AppCenter
import com.microsoft.appcenter.analytics.Analytics
import com.microsoft.appcenter.crashes.Crashes
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {



    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        setupNavigation()
        setupAppCenter()
    }

    private fun setupAppCenter() {
        val appCenterKey = BuildConfig.APP_CENTER_KEY

        AppCenter.start(application,appCenterKey, Analytics::class.java, Crashes::class.java)
    }

    private fun setupNavigation() {
        val navController = findNavController(R.id.nav_host_fragment)
        navigation.setupWithNavController(navController)
    }


}
