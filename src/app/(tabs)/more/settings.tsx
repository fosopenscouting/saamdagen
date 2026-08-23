import React, { useEffect, useState } from 'react';
import { View } from '@/components/Themed/Themed';
import { StyleSheet } from 'react-native';
import {
  getSettings,
  setSetting,
  SettingKeys,
  Settings,
} from '@/services/settingsService';
import { router } from 'expo-router';
import { updateNotificationSettings } from '@/services/notificationService';
import { changeChannel, Channel, useChannel } from '@/utils/useChannel';
import { Host, Switch, Picker, FieldGroup, Text, Row } from '@expo/ui';

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({});
  const [pressesVersion, setPressesVersion] = useState<number>(0);
  const [channel, setChannel] = useState<Channel>('Production');

  const loadSettings = async () => {
    const settings = await getSettings();
    const c = await useChannel();

    setSettings(settings);
    setChannel(c);
  };
  const updateChannel = async (c: Channel) => {
    await changeChannel(c);
    setChannel(c);
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
        <Host style={{ flex: 1 }}>
          <FieldGroup
            style={{
              backgroundColor: 'transparent',
            }}
          >
            <FieldGroup.Section title="Meldingen">
              <Switch
                label="Mogen we je meldingen sturen?"

                value={settings[SettingKeys.MESSAGING]!}
                onValueChange={async () => {
                  await changeSetting(
                    SettingKeys.MESSAGING,
                    !settings[SettingKeys.MESSAGING],
                  );
                  await updateNotificationSettings();
                }}
              />

              {__DEV__ ? (
                <Row alignment="center" spacing={12}>
                  <Text>Kanaal</Text>
                  <Picker
                    selectedValue={channel}
                    onValueChange={(value) => updateChannel(value)}
                  >
                    <Picker.Item
                      key={'Production'}
                      label="Production"
                      value={'Production'}
                    />
                    <Picker.Item
                      key={'Staging'}
                      label="Staging"
                      value={'Staging'}
                    />
                  </Picker>
                </Row>
              ) : null}
            </FieldGroup.Section>

            <FieldGroup.Section>
              <Text onPress={onPressVersion}>
                &copy;&ensp;FOS Open Scouting
              </Text>
            </FieldGroup.Section>
          </FieldGroup>
        </Host>
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
