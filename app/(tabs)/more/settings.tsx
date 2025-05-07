import React, { useEffect, useState } from 'react';
import { HeaderText, View } from '@/components/Themed/Themed';
import { Pressable, StyleSheet } from 'react-native';
import { List, Switch } from 'react-native-paper';
import {
  getSettings,
  setSetting,
  SettingKeys,
  Settings,
} from '@/services/settingsService';
import { router } from 'expo-router';
import { updateNotificationSettings } from '@/services/notificationTokenService';

const SettingItem: React.FC<{
  title: string;
  description: string;
  value: boolean | undefined;
  onChange: any;
}> = ({ title, description, value, onChange }) => {
  return (
    <List.Item
      title={title}
      description={description}
      onPress={onChange}
      right={() => <Switch value={value} onValueChange={onChange} />}
    />
  );
};

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({});
  const [pressesVersion, setPressesVersion] = useState<number>(0);

  const loadSettings = async () => {
    const settings = await getSettings();

    setSettings(settings);
  };

  useEffect(() => {
    if (pressesVersion >= 10) {
      setPressesVersion(0);

      router.navigate('/onboarding');
    }
  }, [pressesVersion]);

  const onPressVersion = () => {
    setPressesVersion((prev) => prev + 1);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const changeSetting = async (key: SettingKeys, value: boolean) => {
    await setSetting(key, value);

    await loadSettings();
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <List.Section>
          <Pressable onPress={onPressVersion}>
            <List.Subheader>Toestemmingen</List.Subheader>
          </Pressable>

          <SettingItem
            title="Analytics"
            description="Mogen we anonieme statistieken versturen om de app te verbeteren?"
            value={settings[SettingKeys.FIREBASE_ANALYTICS]}
            onChange={async () => {
              await changeSetting(
                SettingKeys.FIREBASE_ANALYTICS,
                !settings[SettingKeys.FIREBASE_ANALYTICS],
              );
            }}
          />
          <SettingItem
            title="Meldingen"
            description="Mogen we jou meldingen sturen?"
            value={settings[SettingKeys.MESSAGING]}
            onChange={async () => {
              await changeSetting(
                SettingKeys.MESSAGING,
                !settings[SettingKeys.MESSAGING],
              );
              await updateNotificationSettings()
            }}
          />
        </List.Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginTop: 8,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default SettingsScreen;
