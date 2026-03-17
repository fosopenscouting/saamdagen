import React from 'react';
import { HeaderText, View } from '@/components/Themed/Themed';
import {
  Linking,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Text } from '@/components/Themed/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export interface LicenseItem {
  userUrl: string;
  username: string;
  name: string;
  version: string;
  licenses: string;
  repository: string;
  licenseUrl: string;
  key?: string;
}

const Link = ({
  url,
  style,
  children,
}: {
  url: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}) => (
  <Text
    style={style}
    numberOfLines={1}
    onPress={() => url && Linking.openURL(url)}
    variant="bodyLarge"
  >
    {children}
  </Text>
);

export default function LicensesItem({
  username,
  name,
  version,
  licenses,
  repository,
  licenseUrl,
}: LicenseItem) {
  const title = name;
  let by;
  if (username) {
    if (title.toLowerCase() != username.toLowerCase()) {
      by = `By ${username}`;
    }
  }

  return (
    <View>
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => Linking.openURL(repository)}
          style={styles.item}
        >
          <View style={{ maxWidth: '85%' }}>
            <HeaderText variant="titleMedium">
              {title}@{version}
            </HeaderText>
            <Link url={licenseUrl}>{licenses}</Link>
            <Text>{by}</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={32}
            color={'white'}
            style={{ alignSelf: 'center', marginLeft: 'auto' }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  item: {
    paddingVertical: 8,
    paddingLeft: 12,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    maxWidth: '100%',
  },
});
