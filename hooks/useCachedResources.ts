import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';
import {
  useFonts,
  Quicksand_300Light,
  Quicksand_400Regular,
  Quicksand_600SemiBold,
  Quicksand_500Medium,
} from '@expo-google-fonts/quicksand';

const useCachedResources: () => boolean = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [isContentLoaded, setContentLoaded] = React.useState(false);
  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          Andes: require('../assets/fonts/Andes.otf'),
          AndesLight: require('../assets/fonts/AndesLight.otf'),
          AndesBold: require('../assets/fonts/AndesBold.otf'),
        });

        useFonts({
          Quicksand_300Light,
          Quicksand_400Regular,
          Quicksand_600SemiBold,
          Quicksand_500Medium,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  React.useEffect(() => {
    async function loadContentAsync() {
      try {
        const response = await fetch("https://fosopenscouting.github.io/saamdagen/index.json");
        const json = await response.json();

        var results = [];
        json.pages.forEach(page => {
          results.push(fetch(page.url));
        });
        const content = await Promise.all(results);
        
      } catch(e) {
        console.warn(e);
      } finally {
        setContentLoaded(true);
      }
    }

    loadContentAsync();
  }, [])

  return isLoadingComplete && isContentLoaded;
};

export default useCachedResources;
