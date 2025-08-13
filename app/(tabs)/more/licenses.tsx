import React from 'react';

import LicensesData from '@/assets/licenses.json';
import { Separator, View } from '@/components/Themed/Themed';
import { FlatList, StyleSheet } from 'react-native';
import LicensesItem, { LicenseItem } from '@/components/Licenses/Item';

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

const licenses: LicenseItem[] = Object.keys(LicensesData).map((key) => {
  //@ts-expect-error Stupid typescript, the key is a string!
  const { licenses, ...license } = LicensesData[key];
  const [name, version] = key.split('@');

  let username =
    extractNameFromGHUrl(license.repository) ||
    extractNameFromGHUrl(license.licenseUrl);

  if (username) username = capitalizeFirstLetter(username);

  return {
    name,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

//@ts-expect-error I don't want to do this anymore
sortByDataKey(licenses, 'username');

export default function Licenses() {
  return (
    <View style={styles.container}>
      <FlatList
        data={licenses.filter((l) => l.name)}
        keyExtractor={({ name }, index) => `${index}_${name}`}
        renderItem={({ item }) => <LicensesItem {...item} />}
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
