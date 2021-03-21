import * as React from 'react';
import {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import {REQUEST_POST_LIST} from '../redux/action/authorActions';
import {DEFAULT_PAGINATION_DATA, SORTING_TYPE} from '../const/AppConst';
import {isCloseToBottom} from '../utils/utilFunctions';
import PostCard from '../components/PostCard';
import Title from '../components/Title';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {AppColors} from '../const/Theme';

const Details = (props) => {
  const {postList} = props;
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {getPostByAuthorId} = props;
    const data = {
      authorID,
      ...pagination,
    };
    getPostByAuthorId(data, (res) => {});
  }, [pagination]);

  useEffect(() => {
    setPostListState(postList);
  }, [postList]);

  const onReachedEnd = () => {
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      limit: pagination.limit + 20,
    });
    setIsLoading(true);
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

  return (
    <View style={styles.container}>
      <Text>{`${first_name} ${last_name}`}</Text>
      <Text>{phone}</Text>
      <View>
        <Text>Sort By</Text>
        <TouchableOpacity
          onPress={() => {
            handleSortByDate(dateSortAsc);
          }}>
          <FontAwesome
            name={dateSortAsc ? 'sort-amount-asc' : 'sort-amount-desc'}
            size={30}
            color={AppColors.theme_blue}
          />
          <Text>{'Date Published'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSortByNumOfLikes(likeSortAsc);
          }}>
          <FontAwesome
            name={likeSortAsc ? 'sort-amount-asc' : 'sort-amount-desc'}
            size={30}
            color={AppColors.theme_blue}
          />
          <Text>{'Number Of Likes'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            onReachedEnd();
          }
        }}
        contentContainerStyle={styles.scrollContainer}>
        {postListState.length > 0 ? (
          postListState.map((el, i) => {
            const title = idx(el, (_) => _.numLikes) || '';
            return <PostCard title={title} key={i} />;
          })
        ) : (
          <Title style={{alignSelf: 'center'}} title="NO DATA FOUND" />
        )}
      </ScrollView>
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
    alignItems: 'center',
  },
});
