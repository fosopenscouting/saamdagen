package be.fos.saamdagen.model

data class Session (
    val id: String,
    val title: String,
    val description: String,
    val type: String,
    val location: String,
    val participants: List<Participant>
    ) {

    fun mapTitle(): String {
        return if(title.length > 15){
            title.take(6) + ".." + title.takeLast(6)
        }else {
            title
        }
    }
}