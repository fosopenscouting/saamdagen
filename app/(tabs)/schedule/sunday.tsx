<<<<<<< HEAD
import React from "react"

import { useLocalSearchParams } from "expo-router"
import DayScreen from "@/screens/DayScreen"

export default function ScheduleDayScreen() {
    const { day } : {day: 'Vrijdag' | 'Zaterdag' | 'Zondag'} = useLocalSearchParams()

    return (
       <DayScreen day={day} />
    )
}
=======
import React from 'react';

import { useLocalSearchParams } from 'expo-router';
import DayScreen from '@/screens/DayScreen';

export default function ScheduleDayScreen() {
  const { day }: { day: 'Vrijdag' | 'Zaterdag' | 'Zondag' } =
    useLocalSearchParams();

  return <DayScreen day={day} />;
}
>>>>>>> 4be9c086ef5a3fb8ba91f4be9c3769bee9553c4f
