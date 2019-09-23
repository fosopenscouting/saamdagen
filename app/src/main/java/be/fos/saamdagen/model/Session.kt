package be.fos.saamdagen.model

data class Session (
    val id: Int,
    val title: String,
    val description: String,
    val type: String, //TODO: Enumiseren?
    val location: String
    ) {

    fun mapTitle(): String {
        if(title.length > 15){
            return title.take(6) + ".." + title.takeLast(6)
        }else {
            return title
        }
    }
}