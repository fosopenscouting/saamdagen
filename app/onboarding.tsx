import React, { useRef } from 'react';

import Onboarding from 'react-native-onboarding-swiper';
import { Image } from 'expo-image';
import Colors from '@/constants/Colors';
import { Text } from '@/components/Themed/Text';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SettingKeys } from '@/services/settingsService';
import {
  GiveConsentButtons,
  NextPageButton,
  RedirectButton,
} from '@/components/Onboarding/Buttons';
import { updateNotificationSettings } from '@/services/notificationTokenService';

const OnboardingScreen = () => {
  const onboardingRef = useRef<Onboarding>(null);

  return (
    <Onboarding
      ref={onboardingRef}
      showSkip={false}
      showDone={false}
      showNext={false}
      flatlistProps={{
        scrollEnabled: false,
      }}
      pages={[
        {
          title: 'Hey!',
          subtitle: (
            <View>
              <Text>Welkom bij de Saamdagen app!</Text>
              <Text>
                Voor je kan beginnen, gaan we eerst samen de app instellen.
              </Text>
              <NextPageButton
                onPress={() => {
                  onboardingRef.current?.goNext();
                }}
              />
            </View>
          ),
          backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
          image: (
            <Image
              source={require('@/assets/images/logo.png')}
              style={{
                width: '100%',
                height: 315,
              }}
              contentFit="contain"
            />
          ),
        },
        // {
        //   title: 'Optionele gegevens',
        //   subtitle: (
        //     <View
        //       style={{
        //         paddingHorizontal: 16,
        //         gap: 16,
        //         width: '100%',
        //         alignItems: 'center',
        //       }}
        //     >
        //       <Text>
        //         Help de Saamdagen-app te verbeteren door anonieme
        //         gebruiksgegevens te versturen. {'\n'}
        //         Zo kunnen we nóg sneller de fouten eruit halen!
        //       </Text>

        //       <GiveConsentButtons
        //         onPress={() => {
        //           onboardingRef.current?.goNext();
        //         }}
        //         storageKey={SettingKeys.FIREBASE_ANALYTICS}
        //       />
        //     </View>
        //   ),
        //   backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
        //   image: (
        //     <MaterialCommunityIcons
        //       name="chart-arc"
        //       size={100}
        //       color={'white'}
        //     />
        //   ),
        // },
        {
          title: 'Meldingen',
          subtitle: (
            <View
              style={{
                paddingHorizontal: 16,
                gap: 16,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Text>
                Mogen we jou meldingen sturen?{'\n'}
                Zo kunnen we je sneller op de hoogte brengen als er iets te doen
                is.
              </Text>

              <GiveConsentButtons
                onPress={async () => {
                  await updateNotificationSettings();
                  onboardingRef.current?.goNext();
                }}
                storageKey={SettingKeys.MESSAGING}
              />
            </View>
          ),
          backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
          image: (
            <MaterialCommunityIcons
              name="bell-ring"
              size={100}
              color={'white'}
            />
          ),
        },
        {
          title: 'Helemaal klaar!',
          subtitle: (
            <View
              style={{
                paddingHorizontal: 16,
                gap: 16,
                width: '100%',
                alignItems: 'center',
              }}
            >
              <Text>Wat wil je nu doen?</Text>

              <View
                style={{
                  gap: 8,
                  width: '100%',
                }}
              >
                <RedirectButton to="/" text="Home" icon="home" />
                <RedirectButton
                  to="/more/profile"
                  text="Ticket scannen"
                  icon="qrcode-scan"
                />
              </View>
            </View>
          ),
          backgroundColor: Colors.FOSCOLORS.FOS_BLUE,
          image: (
            <MaterialCommunityIcons
              name="check-all"
              size={100}
              color={'white'}
            />
          ),
        },
      ]}
      titleStyles={{
        fontFamily: 'Quicksand_600SemiBold',
      }}
      subTitleStyles={{
        fontFamily: 'Quicksand_500Medium',
      }}
    />
  );
};

export default OnboardingScreen;
