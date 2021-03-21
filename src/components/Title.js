import React from 'react';
import {StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

import {responsiveFontSize} from '../utils/Scale';
import DefaultProps from '../const/DefaultProps';

const Title = (props) => {
  return (
    <Text
      selectable={props.selectable}
      ellipsizeMode="tail"
      style={[styles.headerText, props.style]}
      numberOfLines={props.numberOfLines}>
      {props.title}
    </Text>
  );
};

Title.defaultProps = {
  style: DefaultProps.EMPTY_OBJECT,
  title: DefaultProps.EMPTY_STRING,
  selectable: false,
  numberOfLines: null,
};

Title.propTypes = {
  style: PropTypes.any,
  title: PropTypes.string,
  selectable: PropTypes.bool,
  numberOfLines: PropTypes.number,
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: responsiveFontSize(2.2),
    fontWeight: '600',
  },
});
export default Title;
