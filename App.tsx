import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

// Import screens
import Intro from "./screens/Intro";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Result from "./screens/Result";
import Component4 from "./screens/Component4";
import Timelinemain from "./screens/Timelinemain";
import Home from "./screens/Home";
import Checklist from "./screens/Checklist";
import PhotoOption from "./screens/PhotoOption";
import CameraScreen from "./screens/CameraScreen";
import UploadComplete from "./screens/UploadComplete";
import ImageUploader from "./screens/ImageUploader";
import Ailoading from "./screens/Ailoading";
import ImageEditor from "./screens/ImageEditor";
import Timelinerecord from "./screens/Timelinerecord";
import RecordEdit from "./screens/RecordEdit";
import Community from "./screens/Community";
import Mypage from "./screens/Mypage";

const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  const [fontsLoaded, error] = useFonts({
    "Inter-Light": require("./assets/fonts/Inter-Light.ttf"),
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
  });

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator
              initialRouteName="Intro"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="Intro"
                component={Intro}
                options={{ headerShown: false }}
              />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
              <Stack.Screen
                name="Result"
                component={Result}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Component4"
                component={Component4}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Timelinemain"
                component={Timelinemain}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Checklist"
                component={Checklist}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PhotoOption"
                component={PhotoOption}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CameraScreen"
                component={CameraScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UploadComplete"
                component={UploadComplete}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ImageUploader"
                component={ImageUploader}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Ailoading"
                component={Ailoading}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ImageEditor"
                component={ImageEditor}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Timelinerecord"
                component={Timelinerecord}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RecordEdit"
                component={RecordEdit}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Community"
                component={Community}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Mypage"
                component={Mypage}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : null}
        </NavigationContainer>
  );
};

export default App;
