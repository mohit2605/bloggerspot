import * as React from 'react';
import {useEffect, useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import {REQUEST_COMMENTS_BY_POST} from '../redux/action/authorActions';
import {DEFAULT_PAGINATION_DATA} from '../const/AppConst';
import PostCard from '../components/PostCard';
import Title from '../components/Title';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/Scale';
import {STRINGS} from '../const/Strings';
import CustomLoader from '../components/CustomLoader';

const PostDetails = (props) => {
  const {commentsByPost} = props;
  const data = idx(props, (_) => _.route.params.data) || [];
  const postID = idx(data, (_) => _.id) || '';
  const title = idx(data, (_) => _.title) || '';

  const [pagination, setPagination] = useState({
    page: DEFAULT_PAGINATION_DATA.PAGE,
    limit: DEFAULT_PAGINATION_DATA.LIMIT,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {getCommentsByPostId} = props;
    getCommentsByPostId(postID, (res) => {
      setIsLoading(false);
    });
  }, [pagination]);

  const onReachedEnd = () => {
    setIsLoading(true);
    setPagination({
      ...pagination,
      page: pagination.page + 1,
      limit: pagination.limit + 20,
    });
  };

  const renderListItem = (el) => {
    const title = idx(el, (_) => _.item.text) || '';
    return <PostCard isDisabled title={title} />;
  };

  return (
    <View style={styles.container}>
      <CustomLoader isVisible={isLoading} />
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.commentText}>{'Comments'}</Text>
      {commentsByPost.length > 0 ? (
        <FlatList
          data={commentsByPost}
          keyExtractor={(i, index) => index}
          onEndReachedThreshold={0}
          onEndReached={onReachedEnd}
          renderItem={renderListItem}
        />
      ) : (
        <Title style={styles.titleView} title={STRINGS.NO_COMMENTS} />
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  const {autherReducer} = state;
  const {commentsByPost} = autherReducer;
  return {
    commentsByPost,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCommentsByPostId: (data, callBack) =>
      dispatch({type: REQUEST_COMMENTS_BY_POST, data, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    width: '80%',
    textAlign: 'center',
  },
  commentText: {
    marginTop: responsiveHeight(2),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2),
    marginHorizontal: responsiveWidth(8),
  },
  titleView: {
    alignSelf: 'center',
    marginTop: responsiveHeight(2),
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
