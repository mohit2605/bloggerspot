import * as React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import {REQUEST_POST_LIST} from '../redux/action/authorActions';
import {DEFAULT_PAGINATION_DATA} from '../const/AppConst';
import PostCard from '../components/PostCard';
import Title from '../components/Title';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../const/Theme';
import {SCREEN} from '../const/NavigationConsts';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Scale';
import {COMMON_STRINGS, STRINGS} from '../const/Strings';
import CustomLoader from '../components/CustomLoader';

const Details = (props) => {
  const {postList, navigation} = props;
  const data = idx(props, (_) => _.route.params.data) || [];
  const authorID = idx(data, (_) => _.id) || '';
  const first_name = idx(data, (_) => _.firstName) || '';
  const last_name = idx(data, (_) => _.lastName) || '';
  const phone = idx(data, (_) => _.phone) || '';
  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGINATION_DATA.PAGE,
    limit: DEFAULT_PAGINATION_DATA.LIMIT,
  });
  const [postListState, setPostListState] = useState([]);
  const [likeSortAsc, setLikeSort] = useState(true);
  const [dateSortAsc, setDateSort] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {getPostByAuthorId} = props;
    const data = {
      authorID,
      ...pagination,
    };
    getPostByAuthorId(data, (res) => {
      setIsLoading(false);
    });
  }, [pagination]);

  useEffect(() => {
    setPostListState(postList);
  }, [postList]);

  const onReachedEnd = () => {
    setIsLoading(true);
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      limit: pagination.limit + 20,
    });
  };

  const handleSortByDate = (isAsc) => {
    const postArray = [...postList];
    postArray.sort((a, b) =>
      isAsc
        ? a.datePublished - b.datePublished
        : b.datePublished - a.datePublished,
    );
    setDateSort(!dateSortAsc);
    setPostListState(postArray);
  };

  const handleSortByNumOfLikes = (isAsc) => {
    const postArray = [...postList];
    if (isAsc) {
    }
    postArray.sort((a, b) =>
      isAsc ? a.numLikes - b.numLikes : b.numLikes - a.numLikes,
    );
    setLikeSort(!likeSortAsc);
    setPostListState(postArray);
  };

  const renderListItem = (el) => {
    const title = idx(el, (_) => _.item.title) || '';
    return (
      <PostCard
        onPress={() => {
          navigation.navigate(SCREEN.POST_DETAILS, {data: el.item});
        }}
        title={title}
      />
    );
  };

  return (
    <View style={styles.container}>
      <CustomLoader isVisible={isLoading} />
      <Text style={styles.header}>{`${first_name} ${last_name}`}</Text>
      <Text style={styles.phone}>{phone}</Text>
      <View style={styles.sortingContainer}>
        <Text style={styles.sortByText}>Sort By</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.sortingBtn}
            onPress={() => {
              handleSortByDate(dateSortAsc);
            }}>
            <FontAwesome
              name={dateSortAsc ? 'sort-amount-asc' : 'sort-amount-desc'}
              size={30}
              color={AppColors.theme_blue}
            />
            <Text style={styles.btnText}>{STRINGS.DATE_PUBLISHED}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortingBtn}
            onPress={() => {
              handleSortByNumOfLikes(likeSortAsc);
            }}>
            <FontAwesome
              name={likeSortAsc ? 'sort-amount-asc' : 'sort-amount-desc'}
              size={30}
              color={AppColors.theme_blue}
            />
            <Text style={styles.btnText}>{STRINGS.NO_OF_LIKES}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {postListState.length > 0 ? (
        <FlatList
          data={postListState}
          keyExtractor={(i, index) => index}
          onEndReachedThreshold={0}
          onEndReached={onReachedEnd}
          renderItem={renderListItem}
        />
      ) : (
        <Title style={{alignSelf: 'center'}} title={COMMON_STRINGS.NO_DATA} />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const {autherReducer} = state;
  const {postList} = autherReducer;
  return {
    postList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPostByAuthorId: (data, callBack) =>
      dispatch({type: REQUEST_POST_LIST, data, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
  },
  phone: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.2),
    fontWeight: '800',
  },
  btnText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '800',
    marginRight: responsiveWidth(1),
  },
  sortingBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: responsiveHeight(5),
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  sortingContainer: {
    alignItems: 'center',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(3),
  },
  sortByText: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    marginBottom: responsiveHeight(2),
  },
});
