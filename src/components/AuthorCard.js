import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../utils/Scale';
import PropTypes from 'prop-types';
import DefaultProps from '../const/DefaultProps';
import idx from 'idx';

const AuthorCard = (props) => {
  const cardData = idx(props, (_) => _.data) || [];
  const first_name = idx(cardData, (_) => _.firstName) || '';
  const last_name = idx(cardData, (_) => _.lastName) || '';
  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.onPress}
      style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{`${first_name} ${last_name}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

AuthorCard.defaultProps = {
  onPress: DefaultProps.noop,
  isDisabled: false,
};

AuthorCard.propTypes = {
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default AuthorCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(4),
    marginVertical: responsiveHeight(2),
    marginHorizontal: responsiveHeight(2),
    borderWidth: 1,
    borderRadius: 25,
  },
  title: {
    fontSize: responsiveFontSize(2),
  },
  infoContainer: {
    paddingVertical: responsiveHeight(2),
  },
});
