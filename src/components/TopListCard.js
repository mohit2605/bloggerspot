import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {responsiveHeight, responsiveWidth} from '../utils/Scale';
import PropTypes from 'prop-types';
import DefaultProps from '../const/DefaultProps';
import idx from 'idx';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../const/Theme';

const TopListCard = (props) => {
  const title = idx(props, (_) => _.title) || '';
  const numOfLikes = idx(props, (_) => _.numOfLikes) || '';
  const numComments = idx(props, (_) => _.numOfComments) || '';
  const isLike = idx(props, (_) => _.isLike) || false;

  return (
    <TouchableOpacity
      disabled={props.isDisabled}
      onPress={props.onPress}
      style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={{width: '80%'}}>
          <Text numberOfLines={2}>{title}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isLike ? (
            <Entypo name={'thumbs-up'} size={30} color={AppColors.theme_blue} />
          ) : (
            <FontAwesome
              name={'comments'}
              size={30}
              color={AppColors.theme_blue}
            />
          )}
          <View
            style={{
              borderWidth: 1,
              borderRadius: 25,
              height: 30,
              width: 30,
              marginLeft: responsiveWidth(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{numOfLikes || numComments}</Text>
          </View>
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
