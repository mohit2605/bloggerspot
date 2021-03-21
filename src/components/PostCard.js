import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../utils/Scale';
import {AppColors} from '../const/Theme';
import PropTypes from 'prop-types';
import DefaultProps from '../const/DefaultProps';
import idx from 'idx';

const PostCard = (props) => {
  const title = idx(props, (_) => _.title) || '';

  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.onPress}
      style={[styles.container, styles.elevation]}>
      <View style={styles.infoContainer}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

PostCard.defaultProps = {
  onPress: DefaultProps.noop,
  isDisabled: false,
};

PostCard.propTypes = {
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default PostCard;

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
    shadowOpacity: 1,
    elevation: 5,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
});
