import React from 'react';
import NewMap from '@/components/Map/NewMap';
import { useFocusEffect } from 'expo-router';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default function Map() {
  useFocusEffect(() => {
    setStatusBarBackgroundColor("transparent", true)
  })

  return <NewMap />;
}
