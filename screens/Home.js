import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RegularTexts from '../componets/Texts/RegularTexts';
import Animated, { FadeInLeft, FadeInRight, FadeInUp, FadeOutDown, FadeOutLeft, FadeOutRight, FadeOutUp } from "react-native-reanimated";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch, useSelector } from 'react-redux';
import { selectOrigin, setDestination, setOrigin } from '../slices/navSlice';
// apiKey: AIzaSyA25oUM8BiNy3Iuv4QaLDTU4YzbZxmZUX4


export default function Home(params) {
  const navigation = params.navigation;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const origin = useSelector(selectOrigin);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const { width, height } = Dimensions.get("window");
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [pickupSet, setPickupSet] = useState(false);
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
        latitudeDelta: 0.005,
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

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['95%', '95%'], []);
  const bottomSheetRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setModalOpen(true);
  }, []);
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);


  // FONTS
  const [fontsLoaded] = useFonts({
    'Manrope_500Medium': require('../assets/Manrope-Medium.ttf'),
    'Manrope_600SemiBold': require('../assets/Manrope-SemiBold.ttf'),
    'Manrope_700Bold': require('../assets/Manrope-Bold.ttf'),
  })

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }

  const setIndexToOne = () => {
    setValid(false);
    console.log("ONE")
  };




  // <View style={{height: '100%', position: 'relative'}}>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider style={{ flex: 1 }}>

        <View style={{ paddingHorizontal: 0, height: '100%' }}>
          <MapView
            style={{ width: width, height: '65%' }}
            provider={PROVIDER_GOOGLE}
            initialRegion={position}
            region={position}
            followsUserLocation={true}
            userLocationUpdateInterval={2000}
            showsUserLocation={true}
          />

          <TouchableOpacity style={styles.menuContainer} onPress={() => { navigation.navigate("Settings") }}>
            <Feather name="menu" size={22} color="#000" />
          </TouchableOpacity>


          <BottomSheet
            ref={bottomSheetRef}
            index={0}
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
                <TouchableOpacity onPress={handlePresentModalPress} style={styles.searchButton}>
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

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 20, }}
          onChange={handleSheetChanges}
          onDismiss={() => setModalOpen(false)}
        >
          <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
          >
            <View style={{ height: '100%', width: windowWidth, backgroundColor: "#fff" }}>
              {/* <View style={styles.topNav}>
                <View style={{ width: "10%" }}>
                  <AntDesign name="close" size={26} style={{ textAlign: "left" }} color="black" />
                </View>

              </View> */}

              <View style={styles.searchButton1}>
                {/* <MaterialCommunityIcons name="map-marker" size={22} color="#737373" /> */}
                <GooglePlacesAutocomplete
                  placeholder='Pick Up Location'
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    console.log(details.address_components[1].short_name)
                    dispatch(
                      setOrigin({
                        location: details.geometry.location,
                        description: data.description,
                        title: details.address_components[1].short_name,
                      })
                    );

                    dispatch(setDestination(null));
                    setPickupSet(true);
                  }}
                  selectProps={{
                    value,
                    onPress: setValue,
                  }}
                  // predefinedPlaces={[
                  //   {
                  //     type: 'Home',
                  //     description: origin.description,
                  //     geometry: {location: {lat: origin.location.lat, lng: origin.location.lng}},
                  //   },
                  // ]}
                  nearbyPlacesAPI='GooglePlacesSearch'
                  debounce={400}
                  minLength={2}
                  returnKeyType={"search"}
                  keyboardAppearance="light"
                  listViewDisplayed={true}
                  enablePoweredByContainer={false}
                  autoFocus="true"
                  query={{
                    key: GOOGLE_MAPS_APIKEY,
                    language: 'en',
                  }}
                  textInputProps={{
                    placeholderTextColor: "#737373",
                  }}
                  styles={pICKStyler}
                />
              </View>

              <View >
                {/* <MaterialCommunityIcons name="map-marker" size={22} color="#737373" /> */}
                <GooglePlacesAutocomplete
                  placeholder='Drop Off'
                  fetchDetails={true}
                  onPress={(data, details = null) => {
                    console.log(details.address_components[1].short_name)
                    dispatch(
                      setDestination({
                        location: details.geometry.location,
                        description: data.description,
                        title: details.address_components[1].short_name,
                      })
                    );

                    if (pickupSet === true) {
                      setTimeout(() => {
                        navigation.navigate('TruckSelection')
                      }, 2000)
                    }
                  }}
                  returnKeyType={'return'}
                  minLength={2}
                  keyboardAppearance="light"
                  listViewDisplayed={true}
                  nearbyPlacesAPI='GooglePlacesSearch'
                  debounce={400}
                  enablePoweredByContainer={false}
                  query={{
                    key: 'AIzaSyA25oUM8BiNy3Iuv4QaLDTU4YzbZxmZUX4',
                    language: 'en',
                  }}
                  textInputProps={{
                    placeholderTextColor: "#737373",
                    returnKeyType: "search"
                  }}
                  styles={placesStyler}
                />
              </View>

              <StatusBar style="dark" />


            </View>


          </Animated.View>
        </BottomSheetModal>
      </BottomSheetModalProvider>



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
    top: 60,
    left: 30,
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
    marginVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1.5,
    borderRadius: 12,
    borderColor: '#737373',
    backgroundColor: "#FAFAFA",
    alignItems: "center"
  },
  searchButton1: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
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


const placesStyler = StyleSheet.create({
  textInputContainer: {
    height: 50,
    borderWidth: 2,
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: '#737373',
    backgroundColor: "#FAFAFA",
  },
  textInput: {
    height: '100%',
    color: '#000',
    fontSize: 17,
    fontFamily: "Manrope_500Medium",
  },

  // STYLE FOR PREDEFINED PLACES

  // predefinedPlacesDescription: {
  //   color: '#1faadb',
  // },
  listView: {
    top: 55,
    zIndex: 10,
    position: 'absolute',
    color: 'black',
    width: '100%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#F76A03',
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 2,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    maxWidth: '100%',
    fontFamily: 'Manrope_500Medium'
  },
})

const pICKStyler = StyleSheet.create({
  textInputContainer: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginHorizontal: 15,
    borderColor: '#737373',
    backgroundColor: "#FAFAFA",
  },

  textInput: {
    height: '100%',
    color: '#000',
    fontSize: 17,
    fontFamily: "Manrope_500Medium",
  },

  // STYLE FOR PREDEFINED PLACES

  // predefinedPlacesDescription: {
  //   color: '#1faadb',
  // },
  listView: {
    top: 110,
    zIndex: 10,
    position: 'absolute',
    color: 'black',
    width: '100%',
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#F76A03',
  },
  description: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 2,
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'center',
    fontSize: 18,
    maxWidth: '100%',
    fontFamily: 'Manrope_500Medium'
  },
})












{/* <View style={styles.rideSearcher}>
  <Text style={{ fontSize: 20, fontFamily: 'Manrope_600SemiBold' }}>Looking for a ride</Text>
  <View>
    <MaterialIndicator color='black' size={20} trackWidth={30 / 10} />
  </View>
</View> */}







