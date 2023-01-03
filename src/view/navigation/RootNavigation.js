import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import AdminAppStack from '../../adminapp/navigation/AdminAppStack';
import AdminHotelStack from '../../adminhotel/navigation/AdminHotelStack';
import { SignInContext } from '../../contexts/authContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import AuthStackB from './AuthStackB';
export default function RootNavigation() {
  const { signedIn } = useContext(SignInContext);
  const { isShowStartScreen, theme } = useSelector(
    (state) => state.Globalreducer,
  );

  const lightTheme = {
    colors: {
      text: '#000',
      untext: '#fff',
      bg: '#fff',
      icon: '#808080',
      box: '#fff',
      special: '#f5f5f5',
    },
  };

  const darkTheme = {
    colors: {
      text: '#fff',
      untext: '#000',
      bg: '#000',
      icon: '#fff',
      box: '#1a1a1a',
      special: '#666161',
    },
  };

  return (
    <PaperProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
      <StatusBar
        backgroundColor={theme === 'light' ? '#fff' : '#000'}
        barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
      />
      <NavigationContainer>
        {signedIn.userToken === null ? (
          <>{isShowStartScreen === true ? <AuthStack /> : <AuthStackB />}</>
        ) : (
          <>
            {signedIn.userToken === 'adminks' ? (
              <AdminHotelStack />
            ) : (
              <>
                {signedIn.userToken === 'adminapp' ? (
                  <AdminAppStack />
                ) : (
                  <AppStack />
                )}
              </>
            )}
          </>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
