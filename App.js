import React from 'react';
import { StatusBar, useColorScheme, } from 'react-native';
import { Colors, } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './src/navigation/NavigationStack';

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </>
  );
};

export default App;