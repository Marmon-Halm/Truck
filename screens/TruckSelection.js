import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions, Image } from 'react-native';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold, Manrope_600SemiBold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBarHeight } from '../componets/shared';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { color } from './color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RegularTexts from '../componets/Texts/RegularTexts';
import AppLoading from 'expo-app-loading';
import TitleText from '../componets/Texts/TitleText';
import { newGrey } from './color';
import small from '../assets/small.png';
import medium from '../assets/medium.png';
import cash from '../assets/cash.png';
import large from '../assets/large.png';
import huge from '../assets/huge.png';
import RegularButton from '../componets/Buttons/RegularButton';
import useUser from '../hook/useUser';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// apiKey: AIzaSyA25oUM8BiNy3Iuv4QaLDTU4YzbZxmZUX4


export default function TruckSelection(params) {
  const navigation = params.navigation;
  const { userData, isLoading: isUserDataLoading } = useUser();
  const { width, height } = Dimensions.get("window");
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
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location)
      setPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.005,
      });
    })();
  }, []);

  const [selectTruck, setSelectTruck] = useState('');
  const [active, setActive] = useState(true);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(true);
  const [active5, setActive5] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (userData) {
      //  console.log('user data ', userData)
    }
  }, [userData, isUserDataLoading])


  const cashActive = () => {

    if (active5 == true) {
      setActive5(false);
      setActive4(true);
    }
  }
  const cardActive = () => {
    if (active4 == true) {
      setActive4(false);
      setActive5(true);
    };
  }

  const sActive = () => {

    if (active1 == true || active2 == true || active3 == true) {
      setActive1(false);
      setActive2(false);
      setActive3(false);
      setActive(true);
      setSelectTruck('Request Small Truck')
    }
  }
  const mActive = () => {

    if (active == true || active3 == true || active2 == true) {
      setActive3(false);
      setActive2(false);
      setActive(false);
      setActive1(true);
      setSelectTruck('Request Medium Truck')
    };
  }
  const lActive = () => {
    if (active == true || active1 == true || active3 == true) {
      setActive(false);
      setActive1(false);
      setActive2(true);
      setActive3(false);
      setSelectTruck('Request Large Truck')
    }
  }
  const hActive = () => {
    if (active == true || active1 == true || active2 == true) {
      setActive1(false);
      setActive(false);
      setActive2(false);
      setActive3(true);
      setSelectTruck('Request Huge Truck')
    };
  }

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['45%', '45%'], []);
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



  // <View style={{height: '100%', position: 'relative'}}>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 0, height: '100%', opacity: modalOpen ? 0.3 : 1 }}>
          <MapView
            style={{ width: width, height: '57.5%' }}
            provider={PROVIDER_GOOGLE}
            initialRegion={position}
            region={position}
            showsUserLocation={true}
          >
          </MapView>




          <BottomSheet
            disabled={modalOpen}
            snapPoints={[500, 700]}
            overDragResistanceFactor={0}
            backgroundStyle={{
              borderRadius: 30, shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
          >
            <View style={styles.truckSelectionContainer}>

              <Text style={{ fontSize: 24, fontFamily: 'Manrope_700Bold', marginBottom: 10 }}>Select Truck</Text>


              <View style={{ flexDirection: 'row', marginBottom: 10, height: '23%', justifyContent: 'space-between' }}>
                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active ? "#F76A03" : "#CFCFCF", backgroundColor: active ? "#FFE3CE" : '#F1F1F1' }} onPress={sActive}>
                  <View style={styles.iconView}>
                    <Image source={small} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active ? 1 : 0.5 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: active ? 'black' : '#7D7878', textAlign: 'center' }}>
                    Small
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active1 ? "#F76A03" : "#CFCFCF", backgroundColor: active1 ? "#FFE3CE" : '#F1F1F1' }} onPress={mActive}>
                  <View style={styles.iconView}>
                    <Image source={medium} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active1 ? 1 : 0.5 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: active1 ? 'black' : '#7D7878', textAlign: 'center' }}>
                    Medium
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active2 ? "#F76A03" : "#CFCFCF", backgroundColor: active2 ? "#FFE3CE" : '#F1F1F1' }} onPress={lActive}>
                  <View style={styles.iconView}>
                    <Image source={large} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active2 ? 1 : 0.5 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: active2 ? 'black' : '#7D7878', textAlign: 'center' }}>
                    Large
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active3 ? "#F76A03" : "#CFCFCF", backgroundColor: active3 ? "#FFE3CE" : '#F1F1F1' }} onPress={hActive}>
                  <View style={styles.iconView}>
                    <Image source={huge} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active3 ? 1 : 0.5 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: active3 ? 'black' : '#7D7878', textAlign: 'center' }}>
                    Huge
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tripInfo} >
                <View style={styles.tripText}>

                  <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="flag-variant" size={24} color="#F76A03" />
                    <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 5 }}>21 km</Text>

                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <MaterialIcons name="timer" size={24} color="#F76A03" />
                    <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>~8min</Text>
                  </View>

                </View>

                <View style={styles.tripText}>
                  <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="weight" size={24} color="#F76A03" />
                    {
                      active && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 5 }}>1 t(tonnes)</Text>
                    }
                    {
                      active1 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>1,5 t(tonnes)</Text>
                    }
                    {
                      active2 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>1,7 t(tonnes)</Text>
                    }
                    {
                      active3 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>9 t (tonnes)</Text>
                    }
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="currency-usd" size={24} color="#F76A03" />
                    <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 5 }}>60.00</Text>
                  </View>
                </View>
              </View>

              <View style={styles.tripDesignInfo} >
                <View style={styles.tripDesign}>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14.5, fontFamily: 'Manrope_700Bold', marginLeft: 5, color: '#8C8C8C' }}>Pickup</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.circle}></View>
                    <View style={styles.line}></View>
                    <View style={styles.rectangle}></View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 14.5, fontFamily: 'Manrope_700Bold', marginLeft: 5, color: '#8C8C8C' }}>Drop-off</Text>
                  </View>

                </View>

                <View style={styles.tripText}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', marginLeft: 5 }}>Spintex Rd, 567a</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', marginLeft: 5 }}>Legon E Rd, Accra</Text>
                  </View>
                </View>

                <View style={styles.tripDesign}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', marginLeft: 5 }}>9:50am</Text>
                  </View>

                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 12, height: 12, borderRadius: 100 / 2, borderWidth: 3, borderColor: 'transparent', backgroundColor: 'transparent' }}></View>
                    <View style={{ width: 75, height: 1, backgroundColor: 'transparent' }}></View>
                    <View style={{ width: 12, height: 12, borderWidth: 3.5, borderColor: 'transparent' }}></View>
                  </View>

                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', marginLeft: 5 }}>10:43am</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={{ height: '12%', paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={handlePresentModalPress}>
                <Text style={{ fontSize: 16, fontFamily: 'Manrope_600SemiBold' }}>Payment Method</Text>
                <View style={{ width: '15%', height: '100%', backgroundColor: "#F1F1F1", justifyContent: "center", alignItems: "center", borderRadius: 15, }}>
                  {
                    active4 ? (
                      <Image source={cash} style={{ width: 24, height: 22, borderRadius: 5 }} />
                    ) : (
                      <MaterialCommunityIcons name="credit-card" size={22} color="black" />
                    )
                  }

                </View>
              </TouchableOpacity>



            </View>

          </BottomSheet>


          <View style={styles.backAndButton}>
            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
              <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" />
            </TouchableOpacity>
            <View style={{ width: '80%' }}>
              {
                active && <RegularButton onPress={() => { navigation.navigate('LocationsPage') }}>Request Small Truck</RegularButton>
              }
              {
                active1 && <RegularButton onPress={() => { navigation.navigate('LocationsPage') }}>{selectTruck}</RegularButton>
              }
              {
                active2 && <RegularButton onPress={() => { navigation.navigate('LocationsPage') }}>{selectTruck}</RegularButton>
              }
              {
                active3 && <RegularButton onPress={() => { navigation.navigate('LocationsPage') }}>{selectTruck}</RegularButton>
              }

            </View>
          </View>






          <StatusBar style="dark" />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backgroundStyle={{ borderRadius: 20, backgroundColor: '#E8E9EB' }}
          onDismiss={() => setModalOpen(false)}
        >
          <View style={styles.paymentOptions}>

            <TouchableOpacity style={styles.option} onPress={cashActive}>
              <View style={styles.iconView2}>
                <Image source={cash} style={{ width: 24, height: 22, borderRadius: 5 }} />
              </View>

              <View style={{ width: '70%', paddingLeft: 15 }}>
                <Text style={styles.optionText}>
                  Cash
                </Text>
              </View>

              <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <MaterialCommunityIcons name={!active4 ? "radiobox-blank" : "radiobox-marked"} size={24} color={color.primary} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={cardActive}>
              <View style={styles.iconView2}>
                <MaterialCommunityIcons name="credit-card" size={22} color="black" />
              </View>

              <View style={{ width: '70%', paddingLeft: 15 }}>
                <Text style={styles.optionText}>
                  Credit / Debit Card
                </Text>
              </View>

              <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <MaterialCommunityIcons name={!active5 ? "radiobox-blank" : "radiobox-marked"} size={24} color={color.primary} />
              </View>
            </TouchableOpacity>


          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>


    </GestureHandlerRootView>




  )
  // small truck - 1t
  //medium truck - 1.5t
  //large truck - 1.7t
  //huge truck -9t


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  backAndButton: {
    height: 110,
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,

  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 55,
    borderWidth: 2,
    backgroundColor: "#FAFAFA",
    borderColor: "#EDEDED",
    borderRadius: 12,
  },
  truckSelectionContainer: {
    height: '52%',
    paddingHorizontal: 12,
  },
  image: {
    width: '100%',
    height: '70%',
    justifyContent: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 13,
    color: '#7D7878',
    textAlign: 'center',
    fontFamily: 'Manrope_600SemiBold',
  },
  carOption1: {
    height: '100%',
    width: '22%',
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: "center",
  },
  carOption2: {
    height: '100%',
    width: '22%',
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: "center",
  },
  carOption3: {
    height: '100%',
    width: '22%',
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: "center",
  },
  carOption4: {
    height: '100%',
    width: '22%',
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: "center",
  },
  tripInfo: {
    height: '25%',
    width: '100%',
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "space-between",
  },
  tripDesignInfo: {
    height: '27%',
    width: '100%',
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "space-between",
  },
  tripText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tripDesign: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  circle: {
    width: 12, height: 12, borderRadius: 100 / 2, borderWidth: 3, borderColor: 'black'
  },
  line: {
    width: 75, height: 1.5, backgroundColor: 'black'
  },
  rectangle: {
    width: 12, height: 12, borderWidth: 3.5, borderColor: 'black'
  },
  iconView: {
    width: '75%',
    height: '55%',
  },
  waitingText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 18,
    color: '#383838',
  },
  priceText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 18,
    color: '#383838',
  },
  iconView2: {
    width: '15%',
    height: '100%',
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  paymentOptions: {
    padding: 20,
    backgroundColor: '#E8E9EB',
    height: '100%'
  },
  option: {
    height: 60,
    width: '100%',
    backgroundColor: 'white',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: "center",
    flexDirection: 'row',
    shadowColor: 'lightgray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  optionText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
    color: '#383838',
  },

});





