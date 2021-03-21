import idx from 'idx';
import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import { SCREEN } from '../const/NavigationConsts';

const Details = (props) => {
  const data = idx(props, (_) => _.route.params.data) || [];
  return (
    <View style={styles.container}>
      <Text>{data.firstName}</Text>
      
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
