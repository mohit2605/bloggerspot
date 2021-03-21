import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../utils/Scale';
import PropTypes from 'prop-types';
import DefaultProps from '../const/DefaultProps';
import idx from 'idx';

const TopListCard = (props) => {
  const title = idx(props, (_) => _.title) || '';

  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.onPress}
      style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

TopListCard.defaultProps = {
  onPress: DefaultProps.noop,
  isDisabled: false,
};

TopListCard.propTypes = {
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default TopListCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(4),
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveHeight(2),
    borderWidth: 1,
    borderRadius: 25,
  },
  infoContainer: {
    paddingVertical: responsiveHeight(2),
  },
});
