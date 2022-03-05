import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, } from 'react-native';
import { Colors, } from 'react-native/Libraries/NewAppScreen';
import Home from './src/screens/Home';

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Home />
    </SafeAreaView>
  );
};

export default App;