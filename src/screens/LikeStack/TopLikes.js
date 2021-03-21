import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import Title from '../../components/Title';
import { REQUEST_LIKES_LIST } from '../../redux/action/authorActions';
import TopListCard from '../../components/TopListCard';

const TopLikes = (props) => {
  const {likesList} = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const {getTopLikesList} = props;
    getTopLikesList((res) => {});
  }, []);

  return (
    <View style={styles.container}>
      <Title style={{alignSelf: 'center'}} title="Top 10 Liked Post" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {likesList.length > 0 ? (
          likesList.map((el, i) => {
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
  const {likesList} = autherReducer;
  return {
    likesList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTopLikesList: (callBack) =>
      dispatch({type: REQUEST_LIKES_LIST, callBack}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopLikes);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
