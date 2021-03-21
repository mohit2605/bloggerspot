import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from '../utils/Scale';
import {AppColors} from '../const/Theme';
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
      style={[styles.container, styles.elevation]}>
      <View style={styles.infoContainer}>
        <Text>{`${first_name} ${last_name}`}</Text>
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
    width: '90%',
    paddingVertical: responsiveHeight(2),
    backgroundColor: AppColors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: responsiveHeight(2),
    paddingRight: responsiveHeight(2),
    paddingLeft: responsiveHeight(1),
  },
  elevation: {
    marginBottom: responsiveHeight(0.5),
    marginHorizontal: responsiveWidth(5),
    // shadowColor: AppColors.grey,
    shadowOpacity: 1,
    elevation: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
