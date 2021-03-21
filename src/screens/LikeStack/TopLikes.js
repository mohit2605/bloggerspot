import * as React from 'react';
import {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import idx from 'idx';
import {connect} from 'react-redux';
import Title from '../../components/Title';
import {REQUEST_LIKES_LIST} from '../../redux/action/authorActions';
import TopListCard from '../../components/TopListCard';
import {responsiveFontSize, responsiveHeight} from '../../utils/Scale';
import CustomLoader from '../../components/CustomLoader';
import {COMMON_STRINGS, STRINGS} from '../../const/Strings';

const TopLikes = (props) => {
  const {likesList} = props;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const {getTopLikesList} = props;
    getTopLikesList((res) => {
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Title style={styles.header} title={STRINGS.TOP_10_LIKED} />
      <CustomLoader isVisible={isLoading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        {likesList.length > 0 ? (
          likesList.map((el, i) => {
            const title = idx(el, (_) => _.title) || '';
            const numLikes = idx(el, (_) => _.numLikes) || '';
            return <TopListCard isLike numOfLikes={numLikes} title={title} key={i} />;
          })
        ) : (
          <Title style={styles.noDataView} title={COMMON_STRINGS.NO_DATA} />
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
  header: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold',
    marginVertical: responsiveHeight(3),
  },
  noDataView: {
    alignSelf: 'center',
  },
});
