import React from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {AppColors} from '../const/Theme';
import PropTypes from 'prop-types';

const CustomLoader = (props) => {
  return props.isVisible ? (
    <ActivityIndicator
      animating={props.isVisible}
      size="large"
      style={styles.activityIndicator(props.isVisible)}
      color={AppColors.theme_blue}
    />
  ) : null;
};

CustomLoader.defaultProps = {
  isVisible: false,
};

CustomLoader.propTypes = {
  isVisible: PropTypes.bool,
};

export default CustomLoader;

const styles = StyleSheet.create({
  activityIndicator: (isVisible) => ({
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: isVisible ? 1 : null,
    backgroundColor: isVisible ? 'rgba(23, 32, 42, 0.09)' : null,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  }),
});
