import * as React from 'react';
import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import Navigation from './navigation';
import { UserProvider } from './providers/userProvide';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import { store } from './store';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
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
    <Provider store={store}>
      <UserProvider onLayout={onLayoutRootView}>
        <Navigation />
      </UserProvider>
    </Provider>


  );




}

// AppRegistry.registerComponent("truck", () => myComponent);

// // runApplication() loads the javascript bundle and runs the app.
// AppRegistry.registerComponent("truck", () => App);


// 

