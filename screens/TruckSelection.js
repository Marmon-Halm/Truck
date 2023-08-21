import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions, Image } from 'react-native';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold, Manrope_600SemiBold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StatusBarHeight } from '../componets/shared';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from 'expo-location';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import StyledTextInput from '../componets/Inputs/StyledTextInput';
import SmallTexts from '../componets/Texts/SmallTexts';
import BigTexts from '../componets/Texts/BigTexts';
import { MaterialIndicator } from 'react-native-indicators';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RegularTexts from '../componets/Texts/RegularTexts';
import AppLoading from 'expo-app-loading';
import TitleText from '../componets/Texts/TitleText';
import { newGrey } from './color';
import small from '../assets/small.png';
import medium from '../assets/medium.png';
import large from '../assets/large.png';
import huge from '../assets/huge.png';
import RegularButton from '../componets/Buttons/RegularButton';


// apiKey: AIzaSyA25oUM8BiNy3Iuv4QaLDTU4YzbZxmZUX4


export default function TruckSelection(params) {
  const navigation = params.navigation;

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

  const sActive = () => {

    if (active1 == true || active2 == true || active3 == true) {
      setActive1(false);
      setActive2(false);
      setActive3(false);
      setActive(true);
      setSelectTruck('Select Small')
    }
  }
  const mActive = () => {

    if (active == true || active3 == true || active2 == true) {
      setActive3(false);
      setActive2(false);
      setActive(false);
      setActive1(true);
      setSelectTruck('Select Medium')
    };
  }
  const lActive = () => {
    if (active == true || active1 == true || active3 == true) {
      setActive(false);
      setActive1(false);
      setActive2(true);
      setActive3(false);
      setSelectTruck('Select Large')
    }
  }
  const hActive = () => {
    if (active == true || active1 == true || active2 == true) {
      setActive1(false);
      setActive(false);
      setActive2(false);
      setActive3(true);
      setSelectTruck('Select Huge')
    };
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



  // <View style={{height: '100%', position: 'relative'}}>

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {
        <View style={{ paddingHorizontal: 0, height: '100%' }}>
          <MapView
            style={{ width: width, height: '57.5%' }}
            provider={PROVIDER_GOOGLE}
            initialRegion={position}
            region={position}
            showsUserLocation={true}
          >
          </MapView>




          <BottomSheet
            snapPoints={[500, 700]}
            overDragResistanceFactor={0}
            backgroundStyle={{
              borderRadius: 30, shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
          >
            <View style={styles.truckSelectionContainer}>
              
              <Text style={{fontSize: 20, fontFamily: 'Manrope_700Bold', marginBottom: 10}}>Select Truck</Text>


              <View style={{ flexDirection: 'row', marginBottom: 10, height: '23%', justifyContent: 'space-between' }}>
                <TouchableOpacity style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center",borderColor: active ? "#F76A03" : "#CFCFCF", backgroundColor: active ? "#FFE3CE" : '#F1F1F1' }} onPress={sActive}>
                  <View style={styles.iconView}>
                    <Image source={small} style={{ width: '100%', height: '100%', resizeMode: "contain" , opacity: active ? 1 : 0.5}} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold',fontSize: 15,color: active ? 'black':'#7D7878',textAlign: 'center'}}>
                    Small
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active1 ? "#F76A03" : "#CFCFCF", backgroundColor: active1 ? "#FFE3CE" : '#F1F1F1' }} onPress={mActive}>
                  <View style={styles.iconView}>
                    <Image source={medium} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active1 ? 1 : 0.5 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold',fontSize: 15,color: active1 ? 'black':'#7D7878',textAlign: 'center'}}>
                    Medium
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active2 ? "#F76A03" : "#CFCFCF", backgroundColor: active2 ? "#FFE3CE" : '#F1F1F1' }} onPress={lActive}>
                  <View style={styles.iconView}>
                    <Image source={large} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active2 ? 1 : 0.5 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold',fontSize: 15,color: active2 ? 'black':'#7D7878',textAlign: 'center'}}>
                    Large
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ height: '100%', width: '22%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active3 ? "#F76A03" : "#CFCFCF", backgroundColor: active3 ? "#FFE3CE" : '#F1F1F1' }} onPress={hActive}>
                  <View style={styles.iconView}>
                    <Image source={huge} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active3 ? 1 : 0.5 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold',fontSize: 15,color: active3 ? 'black':'#7D7878',textAlign: 'center'}}>
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
                      active && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 5 }}>1 t</Text>
                    }
                    {
                      active1 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>1,5 t</Text>
                    }
                    {
                      active2 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>1,7 t</Text>
                    }
                    {
                      active3 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>9 t</Text>
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

              <TouchableOpacity style={{ height: '12%', paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Manrope_600SemiBold' }}>Payment Method</Text>
                <TouchableOpacity><Text style={{ fontSize: 16, fontFamily: 'Manrope_700Bold', color: '#F76A03' }}>Cash</Text></TouchableOpacity>
              </TouchableOpacity>



            </View>

          </BottomSheet> 


          <View style={styles.backAndButton}>
            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
              <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" />
            </TouchableOpacity>
            <View style={{ width: '80%' }}>
              {
                active && <RegularButton>Select Small</RegularButton>
              }
              {
                active1 && <RegularButton>{selectTruck}</RegularButton>
              }
              {
                active2 && <RegularButton>{selectTruck}</RegularButton>
              }
              {
                active3 && <RegularButton>{selectTruck}</RegularButton>
              }
              
            </View>
          </View>

          




          <StatusBar style="dark" />
        </View>
      }
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
  truckNameText: {
   
  },
  priceText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 18,
    color: '#383838',
  },

});













{/* <View style={styles.rideSearcher}>
  <Text style={{ fontSize: 20, fontFamily: 'Manrope_600SemiBold' }}>Looking for a ride</Text>
  <View>
    <MaterialIndicator color='black' size={20} trackWidth={30 / 10} />
  </View>
</View> */}








