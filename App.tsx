import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { PlayerScreen } from './screens/PlayerScreen';

const App: React.FC = () => {
  return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }}>
        <StatusBar barStyle="light-content" />
        <PlayerScreen />
      </SafeAreaView>
  );
};

export default App;
