package be.fos.saamdagen.ui.settings

import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel;
import be.fos.saamdagen.BuildConfig
import com.microsoft.appcenter.analytics.Analytics
import com.microsoft.appcenter.push.Push

class SettingsViewModel : ViewModel() {

    val statisticsEnabled: MutableLiveData<Boolean>
    val notificationsEnabled: MutableLiveData<Boolean>
    private val version = BuildConfig.VERSION_NAME
    val versionString = "Versie: $version"

    init {
        statisticsEnabled = MutableLiveData()
        statisticsEnabled.value = Analytics.isEnabled().get()

        notificationsEnabled = MutableLiveData()
        notificationsEnabled.value = Push.isEnabled().get()
    }

   fun toggleNotifications(checked: Boolean) {

       Push.setEnabled(checked)
       notificationsEnabled.value = Push.isEnabled().get()


   }

    fun toggleStatistics(checked: Boolean) {

        Analytics.setEnabled(checked)
        statisticsEnabled.value = Analytics.isEnabled().get()
    }

}
