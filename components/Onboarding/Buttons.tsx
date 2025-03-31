import React from 'react';

import Colors from '@/constants/Colors';
import { setSetting, SettingKeys } from '@/services/settingsService';
import { GestureResponderEvent, View } from 'react-native';
import { Button, ButtonProps } from 'react-native-paper';
import { router } from 'expo-router';

const DenyOrAcceptButton = ({
  onPress,
  type,
  storageKey,
}: {
  onPress: (e: GestureResponderEvent) => void;
  storageKey: SettingKeys;
  type: 'deny' | 'accept';
}) => {
  const colors: Partial<ButtonProps> = {};

  if (type == 'deny') colors.textColor = Colors.FOSCOLORS.WARMRED;
  if (type == 'accept') colors.buttonColor = Colors.FOSCOLORS.FOS_GREEN;

  return (
    <Button
      style={{
        flexGrow: 1,
      }}
      onPress={async (e) => {
        //save setting
        await setSetting(storageKey, type == 'accept' ? true : false);

        onPress(e);
      }}
      mode={type == 'deny' ? 'text' : 'elevated'}
      {...colors}
    >
      {type == 'deny' ? 'Afwijzen' : 'Accepteren'}
    </Button>
  );
};
export const GiveConsentButtons = ({
  onPress,
  storageKey,
}: {
  onPress: (e: GestureResponderEvent) => void;
  storageKey: SettingKeys;
}) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        width: 'auto',
      }}
    >
      <DenyOrAcceptButton
        onPress={onPress}
        type="deny"
        storageKey={storageKey}
      />
      <DenyOrAcceptButton
        onPress={onPress}
        type="accept"
        storageKey={storageKey}
      />
    </View>
  );
};

export const NextPageButton = ({
  onPress,
}: {
  onPress: (e: GestureResponderEvent) => void;
}) => (
  <Button
    onPress={onPress}
    mode="contained"
    textColor="white"
    style={{
      marginTop: 16,
    }}
    icon={'chevron-right'}
    contentStyle={{
      flexDirection: 'row-reverse',
    }}
  >
    Volgende
  </Button>
);

export const RedirectButton = ({ text, to }: { text: string; to: string }) => (
  <Button
    mode="elevated"
    buttonColor={Colors.FOSCOLORS.FOS_GREEN}
    onPress={async () => {
      await setSetting(SettingKeys.SHOWN_ONBOARDING, true);

      router.dismissTo(to);
    }}
  >
    {text}
  </Button>
);
