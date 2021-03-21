import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {SCREEN} from '../const/NavigationConsts';
import {connect} from 'react-redux';
import {REQUEST_AUTHOR_LIST} from '../redux/action/authorActions';
import AuthorCard from '../components/AuthorCard';
import {responsiveFontSize, responsiveHeight} from '../utils/Scale';
import {DEFAULT_PAGINATION_DATA} from '../const/AppConst';
import Title from '../components/Title';
import {COMMON_STRINGS, STRINGS} from '../const/Strings';
import CustomLoader from '../components/CustomLoader';

const Home = (props) => {
  const {authorList, navigation} = props;
  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGINATION_DATA.PAGE,
    limit: DEFAULT_PAGINATION_DATA.LIMIT,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {getAuthorList} = props;
    if (authorList.length === 0) {
      setIsLoading(true);
    }
    setTimeout(() => {
      getAuthorList(pagination, (res) => {
        setIsLoading(false);
      });
    }, 1000);
  }, [isLoading]);

  const onReachedEnd = () => {
    setIsLoading(true);
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      limit: pagination.limit + 20,
    });
  };

  const renderListItem = (el) => {
    return (
      <AuthorCard
        onPress={() => navigation.navigate(SCREEN.DETAILS, {data: el.item})}
        data={el.item}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Title style={styles.header} title={STRINGS.AUTHOR} />
      {authorList.length > 0 ? (
        <FlatList
          data={authorList}
          keyExtractor={(i, index) => index}
          onEndReachedThreshold={0}
          onEndReached={onReachedEnd}
          renderItem={renderListItem}
        />
      ) : (
        <Title style={{alignSelf: 'center'}} title={COMMON_STRINGS.NO_DATA} />
      )}
      <CustomLoader isVisible={isLoading} />
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
  header: {
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
  },
});
