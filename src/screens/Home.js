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
    const paddingToBottom = 1;
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
      limit: pagination.limit + 5,
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
          <Text>{'NO DATA FOUND'}</Text>
        )}
      </ScrollView>
      <ActivityIndicator size={'large'} animating={true} />
      {/* <Button
        title="Go to Details"
        onPress={() => props.navigation.navigate(SCREEN.DETAILS)}
      /> */}
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
  },
});
