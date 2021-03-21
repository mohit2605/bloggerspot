import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import Title from '../../components/Title';
import {REQUEST_COMMENT_LIST} from '../../redux/action/authorActions';
import TopListCard from '../../components/TopListCard';
import {responsiveFontSize, responsiveHeight} from '../../utils/Scale';
import CustomLoader from '../../components/CustomLoader';
import {COMMON_STRINGS, STRINGS} from '../../const/Strings';

const TopComments = (props) => {
  const {commentList} = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const {getTopCommentedPost} = props;
    getTopCommentedPost((res) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <CustomLoader isVisible={isLoading} />
      <Title style={styles.header} title={STRINGS.TOP_10_COMMENTED} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {commentList.length > 0 ? (
          commentList.map((el, i) => {
            const title = idx(el, (_) => _.title) || '';
            return <TopListCard title={title} key={i} />;
          })
        ) : (
          <Title style={{alignSelf: 'center'}} title={COMMON_STRINGS.NO_DATA} />
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
  header: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(3),
  },
});
