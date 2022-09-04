import React,{useContext} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { SignInContext } from "../../contexts/authContext";
import auth from "@react-native-firebase/auth"
import AdminHotelStack from "../../adminhotel/navigation/AdminHotelStack";
import AdminAppStack from "../../adminapp/navigation/AdminAppStack";
export default function RootNavigation() {
  const { signedIn } = useContext(SignInContext);
  return (
    <NavigationContainer>
      {signedIn.userToken === null? <AuthStack/>:
      <>
      {
        auth().currentUser.email==="adminhotel@gmail.com"?<AdminHotelStack/> :
        <>
        {
          auth().currentUser.email==="adminapp@gmail.com"?<AdminAppStack/>:<AppStack/>
        }
        </>
      }
      </>
      }
    </NavigationContainer>
  );
}