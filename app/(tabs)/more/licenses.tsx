import React from 'react';

import LicensesData from '@/assets/licenses.json';
import { Separator, View } from '@/components/Themed/Themed';
import { FlatList, StyleSheet } from 'react-native';
import LicensesItem from '@/components/Licenses/Item';

const extractNameFromGHUrl = (url: string) => {
  if (!url) {
    return null;
  }

  const reg =
    /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
};
const sortByDataKey = (data: [], key: string) => {
  data.sort(function (a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
};
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const licenses = Object.keys(LicensesData).map((key) => {
  const { licenses, ...license } = LicensesData[key];
  const [name, version] = key.split('@');

  let username =
    extractNameFromGHUrl(license.repository) ||
    extractNameFromGHUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalizeFirstLetter(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortByDataKey(licenses, 'username');

export default function Licenses() {
  const renderItem = React.useCallback(
    ({ item }) => <LicensesItem {...item} />,
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={licenses.filter((l) => l.name)}
        keyExtractor={({ key }) => key}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ItemSeparatorComponent={() => <Separator marginVertical={1} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 'auto',
  },
});
