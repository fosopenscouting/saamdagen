package be.fos.saamdagen.model

import com.google.gson.annotations.SerializedName

class Participant(@SerializedName("first_name") val firstName: String, @SerializedName("last_name") val lastName: String, val time: String)