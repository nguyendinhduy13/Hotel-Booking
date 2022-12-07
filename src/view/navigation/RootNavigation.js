import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import AuthStackB from './AuthStackB';
import AppStack from './AppStack';
import { SignInContext } from '../../contexts/authContext';
import auth from '@react-native-firebase/auth';
import AdminHotelStack from '../../adminhotel/navigation/AdminHotelStack';
import AdminAppStack from '../../adminapp/navigation/AdminAppStack';
import { useSelector } from 'react-redux';
export default function RootNavigation() {
  const { signedIn } = useContext(SignInContext);
  const { isShowStartScreen } = useSelector((state) => state.Globalreducer);
  return (
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
  );
}
