package be.fos.saamdagen.model

data class Session (
    val title: String,
    val description: String,
    val type: String, //TODO: Enumiseren?
    val location: String
    )
