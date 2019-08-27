package be.fos.saamdagen.model

/**
 * Contains all data needed for the app.
 * If the app grows this could be replaced in favor of a more traditional approach where multiple requests are done to a remote API
 */
data class SaamdagenData (
    val sessions: List<Session>,
    val info: List<Info>,
    val version: Int
)