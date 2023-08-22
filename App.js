import * as React from 'react';
import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import Navigation from './navigation';
import { UserProvider } from './providers/userProvide';
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';


SplashScreen.preventAutoHideAsync();

export default function App() {

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    prepare();
  }, []);



  return (
    <Provider>
      <UserProvider >
        <Navigation />
      </UserProvider>
    </Provider>


  );




}

// AppRegistry.registerComponent("truck", () => myComponent);

// // runApplication() loads the javascript bundle and runs the app.
// AppRegistry.registerComponent("truck", () => App);


// 

