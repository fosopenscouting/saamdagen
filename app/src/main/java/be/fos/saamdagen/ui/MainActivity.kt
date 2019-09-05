package be.fos.saamdagen.ui

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.*
import be.fos.saamdagen.BuildConfig
import be.fos.saamdagen.R
import com.microsoft.appcenter.AppCenter
import com.microsoft.appcenter.analytics.Analytics
import com.microsoft.appcenter.crashes.Crashes
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration : AppBarConfiguration

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
        appBarConfiguration =  AppBarConfiguration(setOf(R.id.navigation_home, R.id.navigation_info, R.id.navigation_map, R.id.navigation_schedule, R.id.navigation_session))
        setSupportActionBar(findViewById(R.id.toolbar))

        toolbar.setupWithNavController(navController, appBarConfiguration)

        navigation.setupWithNavController(navController)
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.toolbar,menu)

        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val navController = findNavController(R.id.nav_host_fragment)
        return item.onNavDestinationSelected(navController) || super.onOptionsItemSelected(item)
    }


}
