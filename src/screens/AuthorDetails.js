import idx from 'idx';
import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import { SCREEN } from '../const/NavigationConsts';

const Details = (props) => {
  const data = idx(props, (_) => _.route.params.data) || [];
  const first_name = idx(data, (_) => _.firstName) || '';
  const last_name = idx(data, (_) => _.lastName) || '';
  const phone = idx(data, (_) => _.phone) || '';
  return (
    <View style={styles.container}>
      <Text>{`${first_name} ${last_name}`}</Text>
      <Text>{phone}</Text>
      
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
