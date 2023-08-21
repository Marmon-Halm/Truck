import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold, Manrope_600SemiBold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StatusBarHeight } from '../componets/shared';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RegularTexts from '../componets/Texts/RegularTexts';
import AppLoading from 'expo-app-loading';
import * as Permissions from 'expo-permissions';
import TitleText from '../componets/Texts/TitleText';
import { newGrey } from './color';
import Geocoder from 'react-native-geocoder';
import { GOOGLE_API_KEY } from '../environment';
import { setDoc } from 'firebase/firestore';


// apiKey: AIzaSyA25oUM8BiNy3Iuv4QaLDTU4YzbZxmZUX4


export default function Home(params) {
  const navigation = params.navigation;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [valid, setValid] = useState(false);
  const { width, height } = Dimensions.get("window");
  const [displayCurrentAddress, SetDisplayCurrentAddress] = useState('Fetching your location')
  const [displayAddress, SetDisplayAddress] = useState('Fetching your location')
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({
      });
      setLocation(location);
      let address = await Location.reverseGeocodeAsync(location.coords)
      SetDisplayAddress(address[0].name)
      SetDisplayCurrentAddress(address[0].street)

      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.005,
      });



    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  let [fontsLoaded] = useFonts({

    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const setIndexToOne = () => {
    setValid(false);
    console.log("ONE")
  }


  // <View style={{height: '100%', position: 'relative'}}>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {
        <View style={{ paddingHorizontal: 0, height: '100%' }}>
          <MapView
            style={{ width: width, height: '65%' }}
            provider={PROVIDER_GOOGLE}
            initialRegion={position}
            region={position}
            showsUserLocation={true}
          />

          <TouchableOpacity style={styles.menuContainer} onPress={() => { navigation.navigate("Settings") }}>
            <Feather name="menu" size={22} color="#000" />
          </TouchableOpacity>


          <BottomSheet
            snapPoints={[350, 500]}
            overDragResistanceFactor={0}
            backgroundStyle={{
              borderRadius: 20, shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
          >
            <View style={styles.searchContainer}>
              <View style={{ alignItems: "center", marginBottom: 15 }}>
                <Text style={{ color: "#737373", fontFamily: "Manrope_500Medium", fontSize: 12 }}>{displayAddress}</Text>
                <RegularTexts style={{ textAlign: "center" }}>{displayCurrentAddress}</RegularTexts>
              </View>
              <View >
                <TouchableOpacity onPress={() => { navigation.navigate('Location') }} style={styles.searchButton}>
                  <Feather name="search" style={{ marginRight: 8 }} size={18} color="#737373" />
                  <RegularTexts style={{ color: "#737373" }}>Where to ?</RegularTexts>
                </TouchableOpacity>
              </View>

              <View style={{ marginVertical: 25, flex: 1, flexDirection: 'row', justifyContent: "space-between", width: 420 }} >
                <View style={styles.addressTabs}>
                  <Ionicons name="location-outline" size={42} color="#C9C9C9" />
                  <Text style={{ fontSize: 18, fontFamily: "Manrope_500Medium" }}>Home</Text>
                </View>

                <View style={styles.addressTabs}>
                  <Ionicons name="location-outline" size={42} color="#C9C9C9" />
                  <Text style={{ fontSize: 18, fontFamily: "Manrope_500Medium" }}>Work</Text>
                </View>

                <View style={styles.addressTabs}>
                  <Ionicons name="location-outline" size={42} color="#C9C9C9" />
                  <Text style={{ fontSize: 18, fontFamily: "Manrope_500Medium" }}>Address</Text>
                </View>
              </View>
            </View>

          </BottomSheet>

          <StatusBar style="dark" />
        </View>
      }
    </GestureHandlerRootView>




  )




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  menuContainer: {
    width: 42,
    height: 42,
    backgroundColor: 'white',
    position: 'absolute',
    top: Constants.statusBarHeight,
    left: 25,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#737373",
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  locationContainer: {
    width: Platform.OS === 'ios' ? 40 : 0,
    height: Platform.OS === 'ios' ? 40 : 0,
    backgroundColor: 'white',
    position: 'absolute',
    top: Constants.statusBarHeight,
    right: 20,
    borderRadius: 50 / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "#737373"
  },
  rideSearcher: {
    height: 55,
    width: "90%",
    borderWidth: 1,
    borderColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: '#EDEDED',
    bottom: 70,
    right: 18,
    alignItems: 'center',
    paddingHorizontal: 20,

  },
  searchButton: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 15,
    marginVertical: 5,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: '#737373',
    backgroundColor: "#FAFAFA",
    alignItems: "center"
  },
  searchContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  addressTabs: {
    justifyContent: "center",
    alignItems: "center",
    height: 104,
    width: 127,
    borderWidth: 1.5,
    backgroundColor: "#FAFAFA",
    borderColor: "#EDEDED",
    borderRadius: 10,
  },

});













{/* <View style={styles.rideSearcher}>
  <Text style={{ fontSize: 20, fontFamily: 'Manrope_600SemiBold' }}>Looking for a ride</Text>
  <View>
    <MaterialIndicator color='black' size={20} trackWidth={30 / 10} />
  </View>
</View> */}








