package be.fos.saamdagen.model

data class Session (
    val id: String,
    val title: String,
    val description: String,
    val type: String, //TODO: Enumiseren?
    val location: String
    ) {

    fun mapTitle(): String {
        return if(title.length > 15){
            title.take(6) + ".." + title.takeLast(6)
        }else {
            title
        }
    }
}