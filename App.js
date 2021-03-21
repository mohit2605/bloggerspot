import * as React from 'react';
import 'react-native-gesture-handler';
import {disableFontScaling} from './src/utils/Scale';
import AppNavigator from './src/navigation/AppNavigator';
import createSagaMiddleware from 'redux-saga';
import {watcherSaga} from './src/redux/saga/';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducer from './src/redux/reducer';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(watcherSaga);

function App() {
  disableFontScaling();
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
