import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SCREEN} from '../const/NavigationConsts';
import {connect} from 'react-redux';
import {REQUEST_AUTHOR_LIST} from '../redux/action/authorActions';
import AuthorCard from '../components/AuthorCard';
import {responsiveHeight} from '../utils/Scale';
import {DEFAULT_PAGINATION_DATA} from '../const/AppConst';
import {AppColors} from '../const/Theme';
import Title from '../components/Title';
const Home = (props) => {
  const {authorList, navigation} = props;
  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGINATION_DATA.PAGE,
    limit: DEFAULT_PAGINATION_DATA.LIMIT,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {getAuthorList} = props;
    getAuthorList(pagination, (res) => {
      setIsLoading(false);
    });
  }, [isLoading]);

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 5;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const onReachedEnd = () => {
    console.log(pagination);
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      limit: pagination.limit + 20,
    });
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            onReachedEnd();
          }
        }}
        contentContainerStyle={styles.scrollContainer}>
        {authorList.length > 0 ? (
          authorList.map((el, i) => {
            return (
              <AuthorCard
                onPress={() => navigation.navigate(SCREEN.DETAILS, {data: el})}
                data={el}
                key={i}
              />
            );
          })
        ) : (
          <Title style={{alignSelf: 'center'}} title="NO DATA FOUND" />
        )}
      </ScrollView>
      <ActivityIndicator
        style={styles.loaderStyle}
        color={AppColors.theme_blue}
        size={'large'}
        animating={isLoading}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  const {autherReducer} = state;
  const {authorList} = autherReducer;
  return {
    authorList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAuthorList: (data, callBack) =>
      dispatch({type: REQUEST_AUTHOR_LIST, data, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: responsiveHeight(5),
    zIndex: 1,
  },
  loaderStyle: {
    marginTop: responsiveHeight(3),
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
  },
});
