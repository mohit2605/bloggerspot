import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import {REQUEST_POST_LIST} from '../redux/action/authorActions';
import {DEFAULT_PAGINATION_DATA} from '../const/AppConst';
import {isCloseToBottom} from '../utils/utilFunctions';
import PostCard from '../components/PostCard';
import Title from '../components/Title';

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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {getPostByAuthorId} = props;
    const data = {
      authorID,
      ...pagination,
    };
    getPostByAuthorId(data, (res) => {});
  }, [pagination]);

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
      <Text>{`${first_name} ${last_name}`}</Text>
      <Text>{phone}</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            onReachedEnd();
          }
        }}
        contentContainerStyle={styles.scrollContainer}>
        {postList.length > 0 ? (
          postList.map((el, i) => {
            const title = idx(el, (_) => _.title) || '';
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
