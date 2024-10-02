import React from 'react';

import { HeaderText, View } from '../Themed/Themed';
import {
  Linking,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Image } from "expo-image"
import { Text } from '../Themed/Text';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Link = ({
  url,
  style,
  children,
}: {
  url: string;
  style: StyleProp<TextStyle>;
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
  image,
  userUrl,
  username,
  name,
  version,
  licenses,
  repository,
  licenseUrl,
  parents,
}: {
  image: string;
  userUrl: string;
  username: string;
  name: string;
  version: string;
  licenses: string;
  repository: string;
  licenseUrl: string;
  parents: string;
}) {
  let title = name;
  let by;
  if (username) {
    if (title.toLowerCase() != username.toLowerCase()) {
      by = `By ${username}`;
    }
  }

  return (
    <View>
      <View style={styles.cardShadow}>
        <View style={styles.card}>
          {image && (
            <TouchableOpacity onPress={() => Linking.openURL(userUrl)}>
              <Image source={{ uri: image }} style={styles.image} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            // underlayColor={'#eeeeee'}
            onPress={() => Linking.openURL(repository)}
            style={styles.item}
          >
            <View style={{ maxWidth: '90%' }}>
              <HeaderText variant="titleMedium">
                {title}@{version}
              </HeaderText>
              <Link style={styles.text} url={licenseUrl}>
                {licenses}
              </Link>
              <Text style={styles.text}>{by}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  cardShadow: {
    marginHorizontal: 12,
    marginVertical: 6,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 2,
  },
  item: {
    paddingVertical: 16,
    paddingLeft: 12,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    maxWidth: '100%',
  },
  image: {
    width: 96,
    maxWidth: 96,
    flex: 1,
    borderRadius: 0,
  },

  text: {
    marginTop: 3,
  },
});
