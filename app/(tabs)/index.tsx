import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native';
import { Image, ImageBackground } from 'expo-image';
import CountdownTimer from '@/components/CountDownTimer';
import BasicCard from '@/components/BasicCard';
import { HomeScreenSection } from '@/models/HomeScreenSection';
import { HOME_ITEMS } from '@/constants/Strings';
import { useDataContext } from '@/hooks/useDataContext';
import Colors from '@/constants/Colors';
import ContentCard from '@/components/ContentCard';
import { Text } from '@/components/Themed/Text';
import { RefreshControl } from 'react-native-gesture-handler';
import * as Updates from 'expo-updates';
import { Banner } from 'react-native-paper';
import { ExecutionEnvironment } from 'expo-constants';
import { ContentMetadata } from '@/models/ContentMetadata';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { HeaderText } from '@/components/Themed/Themed';

const HomeScreen: React.FC = () => {
  const { data, refreshContext, refreshing } = useDataContext();
  const [filteredData, setFilteredData] = useState<
    ContentMetadata | undefined
  >();
  const [snackbarVisible, setUpdateSnackbarVisible] = useState(false);

  const handleRefresh = async () => {
    await refreshContext();
  };

  useFocusEffect(() => {
    setStatusBarBackgroundColor('transparent', true);
  });

  //Automatic update in background
  async function onFetchUpdateAsync() {
    const isStandalone = ExecutionEnvironment.Standalone === 'standalone';
    if (isStandalone) return;

    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        setUpdateSnackbarVisible(true);
      }
    } catch (error) {
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  // Always try to refresh data on load. We can do it here because the screen is never unmounted in the bottom tab.
  useEffect(() => {
    const refreshAsync = async () => {
      await refreshContext();
    };
    refreshAsync();
    onFetchUpdateAsync();
  }, []);

  useEffect(() => {
    setFilteredData(data?.filter((x) => x.key === HOME_ITEMS)[0]);
  }, [data]);

  const handleUpdateApp = async () => {
    try {
      await Updates.reloadAsync();
    } catch (error) {
      alert(`Error updating the app: ${error}`);
    }
  };

  return (
    <>
      <ScrollView
        style={{ height: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <ImageBackground
          imageStyle={{ opacity: 0.7 }}
          source={require('@/assets/images/home-banner-2.png')}
          style={styles.foregroundImage}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                marginTop: 26,
                height: '70%',
                width: '100%',
              }}
              contentFit="contain"
              source={require('@/assets/images/logo.png')}
            />
          </View>
        </ImageBackground>
        <CountdownTimer targetDate={new Date('2025-09-26T20:00:00+02:00')} />
        <ContentCard
          containerStyle={styles.saamregels}
          palette="fosBlue"
          backgroundImage={require('@/assets/images/saamregels.png')}
        >
          {/* @ts-expect-error Text expects children, none are needed */}
          <Text style={styles.countdownTitle}></Text>
        </ContentCard>
        {filteredData?.content?.map(
          (item: HomeScreenSection, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item.link) {
                  router.push(item.link, {
                    withAnchor: true,
                  });
                }
              }}
              activeOpacity={item.link ? 0.7 : 1}
            >
              <BasicCard
                containerStyle={[
                  styles.basicCard,
                  index === filteredData?.content.length - 1
                    ? styles.lastCard
                    : null,
                ]}
                content={item.content}
                title={item.title}
                mode="elevated"
                palette="fosBlue"
                hasLink={item.link ? true : false}
              />
            </TouchableOpacity>
          ),
        )}
      </ScrollView>
      <Banner
        visible={snackbarVisible}
        actions={[
          {
            label: 'Updaten',
            onPress: handleUpdateApp,
          },
        ]}
        icon={({ size }) => (
          <MaterialCommunityIcons name="update" color="#fff" size={size} />
        )}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <HeaderText variant="bodyLarge">
            Er is een update beschikbaar!
          </HeaderText>
          <Text>
            Maak je helemaal klaar voor Saamdagen door de nieuwste versie van de
            app te downloaden.
          </Text>
          <Text>Zo kan je nóg meer genieten van Saamdagen!</Text>
        </View>
      </Banner>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  basicCard: {
    marginHorizontal: 8,
    marginTop: 8,
  },
  lastCard: {
    marginBottom: 8,
  },
  logo: {
    padding: 4,
    color: 'white',
    flex: 1,
    alignItems: 'center',
    margin: 16,
  },
  foregroundImage: {
    width: '100%',
    height: 430,
    backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
    marginBottom: 8,
  },
  saamregels: {
    marginHorizontal: 8,
    height: 200,
  },
  countdownTitle: {
    height: '100%',
  },
});
