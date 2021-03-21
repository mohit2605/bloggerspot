import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import Title from '../../components/Title';
import {REQUEST_COMMENT_LIST} from '../../redux/action/authorActions';
import TopListCard from '../../components/TopListCard';

const TopComments = (props) => {
  const {commentList} = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {getTopCommentedPost} = props;
    getTopCommentedPost((res) => {});
  }, []);

  return (
    <View style={styles.container}>
      <Title style={{alignSelf: 'center'}} title="Top 10 Liked Post" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {commentList.length > 0 ? (
          commentList.map((el, i) => {
            const title = idx(el, (_) => _.title) || '';
            return <TopListCard title={title} key={i} />;
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
  const {commentList} = autherReducer;
  return {
    commentList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTopCommentedPost: (callBack) =>
      dispatch({type: REQUEST_COMMENT_LIST, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopComments);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
