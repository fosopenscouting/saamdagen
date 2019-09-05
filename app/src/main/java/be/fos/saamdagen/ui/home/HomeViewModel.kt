package be.fos.saamdagen.ui.home

import androidx.lifecycle.ViewModel;
import be.fos.saamdagen.data.JsonSaamdagenDataSource
import be.fos.saamdagen.data.SaamdagenDataRepository
import be.fos.saamdagen.model.NewsItem

class HomeViewModel : ViewModel() {

    val newsItems: List<NewsItem>

    init {
        this.newsItems = SaamdagenDataRepository(JsonSaamdagenDataSource).getNewsItems()
    }

}
