package be.fos.saamdagen

import android.app.Application
import android.R.attr.start
import com.microsoft.appcenter.AppCenter
import com.microsoft.appcenter.analytics.Analytics
import com.microsoft.appcenter.crashes.Crashes


class SaamdagenApplication: Application() {

    override fun onCreate() {
        super.onCreate()

        AppCenter.start(
            this, getString(R.string.app_center_key),
            Analytics::class.java, Crashes::class.java
        )
    }
}