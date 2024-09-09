import React from "react"

import { useLocalSearchParams } from "expo-router"
import DayScreen from "@/screens/DayScreen"

export default function ScheduleDayScreen() {
    const { day } : {day: 'Vrijdag' | 'Zaterdag' | 'Zondag'} = useLocalSearchParams()

    return (
       <DayScreen day={day} />
    )
}