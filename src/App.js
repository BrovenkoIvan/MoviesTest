import React from 'react';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import RootComponent from './navigation/RootComponent';
import {PersistGate} from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
}
