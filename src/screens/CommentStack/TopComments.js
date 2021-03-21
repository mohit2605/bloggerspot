import idx from 'idx';
import * as React from 'react';
import {Button, View, Text, StyleSheet} from 'react-native';
import { SCREEN } from '../const/NavigationConsts';

const TopComments = (props) => {
  // const data = idx(props, (_) => _.route.params.data) || [];
  return (
    <View style={styles.container}>
      <Text>{'Top Comments'}</Text>
      
    </View>
  );
};

export default TopComments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
