import * as React from 'react';
import 'react-native-gesture-handler';
import { useEffect, useCallback, useState } from 'react';
import { AppRegistry } from 'react-native';
import Navigation from './navigation';
import { UserProvider } from './providers/userProvide';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';


export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync(Entypo.font);
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }


  return (
    <UserProvider onLayout={onLayoutRootView}>
      <Navigation />
    </UserProvider>

  );




}

AppRegistry.registerComponent("truck", () => myComponent);

// runApplication() loads the javascript bundle and runs the app.
AppRegistry.registerComponent("truck", () => App);


// 

