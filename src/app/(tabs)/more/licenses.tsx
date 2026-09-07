import React from 'react';

import LicensesData from '@/assets/licenses.json';
import { Separator, View } from '@/components/Themed/Themed';
import { FlatList, StyleSheet } from 'react-native';
import LicensesItem, { LicenseItem } from '@/components/Licenses/Item';

const licenses: LicenseItem[] = LicensesData.map((l) => {
  return {
    name: l.name,
    username: l.author,
    licenses: l.licenseType,
    version: l.installedVersion,
    repository: l['repository.url'],
  };
});

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
