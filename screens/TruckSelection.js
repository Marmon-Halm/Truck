import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Dimensions, Image, FlatList } from 'react-native';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold, Manrope_600SemiBold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { color } from './color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import small from '../assets/small.png';
import medium from '../assets/medium.png';
import cash from '../assets/cash.png';
import large from '../assets/large.png';
import { auth, db } from '../config';
import pin from '../assets/pin.png';
import flag from '../assets/flag.png';
import huge from '../assets/huge.png';
import { doc, updateDoc } from '@firebase/firestore';
import RegularButton from '../componets/Buttons/RegularButton';
import useUser from '../hook/useUser';
import * as SplashScreen from 'expo-splash-screen';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectTravelTimeInformation, setCarType, setTravelTimeInformation, } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { MaterialIndicator } from 'react-native-indicators';
import { mapStyle } from '../global/mapStyle';

export default function TruckSelection(params) {
  const navigation = params.navigation;
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const dispatch = useDispatch();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  const mapRef = useRef(null);
  const searchChargeRate = 1.5;
  const { userData, isLoading: isUserDataLoading } = useUser();
  const { width, height } = Dimensions.get("window");
  const [position, setPosition] = useState({
    latitude: origin.location.lat,
    longitude: origin.location.lng,
  });
  const [coords, setCoords] = useState([
    {
      latitude: origin.location.lat,
      longitude: origin.location.lng,
    },
    {
      latitude: destination.location.lat,
      longitude: destination.location.lng,
    }

  ]);
  const [destinationPosition, setDestinationPosition] = useState({
    latitude: destination.location.lat,
    longitude: destination.location.lng,
  });

  const [loading, setLoading] = useState(false);
  const [truckPrice, setTruckPrice] = useState(1.3);
  const [selectTruck, setSelectTruck] = useState('Request Small Truck');
  const [truckType, setTruckType] = useState('Small');
  const [active, setActive] = useState(true);
  const [active1, setActive1] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(true);
  const [active5, setActive5] = useState(false);
  const [newNContainer, setNewNContainer] = useState('');
  const [activePayment, setActivePayment] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [newTimeMin, setNewTimeMin] = useState('');
  const [newTimeHr, setNewTimeHr] = useState('');
  const [etaHrs, setEtaHrs] = useState('');
  const [etaMinutes, setEtaMinutes] = useState('');

  const [disabledBtn, setDisabledBtn] = useState(false);
  const [addedHrPM, setAddedHrPm] = useState(null)


  useEffect(() => {
    if (userData) {
      if (userData.cardAdded == true) {
        setActive5(true)
      }

      if (userData.ccSelected == true) {
        setActive4(false);
      }
    };

    dispatch(
      setCarType({
        description: truckType,
      })
    );

  }, [userData, isUserDataLoading])

  useEffect(() => {


    // if (activePayment == true) {
    //   setActive4(false);
    // };

    if (!origin || !destination) return;

    const getTravelTime = async () => {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_APIKEY}`
      ).then((res) => res.json())
        .then(data => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
          const route = data.rows[0];
          const durationInSeconds = route.elements[0].duration.value;
          setEtaMinutes(Math.ceil(durationInSeconds / 60))
          setEtaHrs(Math.ceil((durationInSeconds / 60) / 60))
        })

    }
    getTravelTime();

    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const newMin = min + 8;
    const loadTime = () => {
      if (etaMinutes > 60) {
        setNewTimeHr(etaHrs);
      } else {
        setNewTimeMin(etaMinutes)
      }

    };

    loadTime();
    const addedHr = hours + newTimeHr;
    const addedMin = newMin + newTimeMin;

    const timeAuth = () => {

      if (addedHr > 12) {
        setAddedHrPm(addedHr - 12);
        console.log("ADDED HOUR PM", addedHrPM)
        setEstimatedTime(
          "0" + addedHrPM + ' :' + addedMin + " PM"
        );
        // console.log("ETA HOUR IS MORE THAN 12")
        // if (addedHrPM < 10) {
        //   setEstimatedTime(
        //     "0" + addedHrPM + ' :' + addedMin + " PM"
        //   );
        // } else {
        //   setEstimatedTime(
        //     addedHrPM + ' :' + addedMin + " PM"
        //   );
        // }

        if (addedHrPM < 10) {
          // console.log(addedHrPM)
          setEstimatedTime(
            "0" + addedHrPM + ' :' + addedMin + " PM"
          );
          //  console.log("ETA HOUR IS MORE THAN 12  && IS LESS THAN 10")
        }

      } else {
        setEstimatedTime(
          addedHr + ' :' + addedMin + " AM"
        );
      };


      if (addedMin >= 60) {
        const newAddedHr = parseInt(addedHr) + 1;
        const newAddedMin = parseInt(addedMin) - 60;
        const newEditedHr = newAddedHr - 12;

        if (newAddedMin <= 10) {
          setEstimatedTime(
            newEditedHr + ' :' + "0" + newAddedMin + " PM"
          );
        } else {
          setEstimatedTime(
            "0" + newAddedHr + ':' + newAddedMin
          );
        }

      } else {
        // console.log("ETA MINUTES ARE LESS THAN 60")
        setEstimatedTime(
          addedHr + ':' + addedMin + " AM"
        );
      };


    };

    const runCTime = () => {
      if (newMin >= 60) {
        const newLiveHr = parseInt(hours) + 1;
        const newLiveMin = parseInt(newMin) - 60;
        setCurrentDate(
          newLiveHr + ':' + newLiveMin + " PM"
        );
      } else if (hours > 12) {
        const newLiveHrPM = hours - 12;
        setCurrentDate(
          newLiveHrPM + ':' + newMin + " PM"
        );

        if (hours > 12 && newMin < 10) {
          setCurrentDate(
            newLiveHrPM + ':' + "0" + newMin + " PM"
          );
        }
      } else if (newMin < 10) {
        setCurrentDate(
          hours + ':' + "0" + newMin + " AM"
        );
      };

    };

    runCTime();


    setTimeout(() => {
      timeAuth();
    }, 1000)

  }, [userData, isUserDataLoading, origin, destination, GOOGLE_MAPS_APIKEY])

  // useEffect(() => {

  // }, [])

  const runFitToCoordinates = () => {
    // const coordinates = position;
    // const radiusBoundaries = getBoundsOfDistance(coordinates, earthRadius * 1000)

    mapRef.current.fitToCoordinates(coords, {
      edgePadding: {
        top: 70,
        right: 50,
        bottom: 70,
        left: 50,
      },
      animated: true
    })
  };


  const userID = doc(db, "users", userData.uid)

  const cashActive = () => {
    

    if (active5 == true) {
      setActive5(false);
      setActive4(true);
    }

    setTimeout( async () => {
      await updateDoc(userID, {
        ccSelected: false
      });
    }, 2000)
  }
  const cardActive = async () => {
    if (active4 == true) {
      setActive4(false);
      setActive5(true);

      await updateDoc(userID, {
        ccSelected: true
    });
  
    };
  }

  const sActive = () => {

    if (active1 == true || active2 == true || active3 == true) {
      setActive1(false);
      setActive2(false);
      setActive3(false);
      setActive(true);
      setSelectTruck('Request Small Truck')
      setTruckPrice(1.3)
      dispatch(
        setCarType({
          description: "Small",
        })
      );
    }
  }
  const mActive = () => {

    if (active == true || active3 == true || active2 == true) {
      setActive3(false);
      setActive2(false);
      setActive(false);
      setActive1(true);
      setSelectTruck('Request Medium Truck');
      setTruckPrice(1.85);
      dispatch(
        setCarType({
          description: "Medium",
        })
      );
    };
  }
  const lActive = () => {
    if (active == true || active1 == true || active3 == true) {
      setActive(false);
      setActive1(false);
      setActive2(true);
      setActive3(false);
      setSelectTruck('Request Large Truck');
      setTruckPrice(2.6);
      dispatch(
        setCarType({
          description: "Large",
        })
      );
    }
  }
  const hActive = () => {
    if (active == true || active1 == true || active2 == true) {
      setActive1(false);
      setActive(false);
      setActive2(false);
      setActive3(true);
      setSelectTruck('Request Huge Truck');
      setTruckPrice(6);
      dispatch(
        setCarType({
          description: "Huge",
        })
      );
    };
  }

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['45%', '45%'], []);
  const snapPoints1 = useMemo(() => ['60%', '60%'], []);
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
            ref={mapRef}
            style={{ width: width, height: '41%' }}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
            }}
            customMapStyle={mapStyle}
            onMapReady={() => {
              runFitToCoordinates();
            }}
          >

            {
              origin && destination && (
                <MapViewDirections
                  origin={position}
                  destination={destinationPosition}
                  apikey={GOOGLE_MAPS_APIKEY}
                  strokeWidth={3}
                  strokeColor='black'
                />
              )
            }

            {
              origin?.location && (
                <Marker
                  coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                  }}
                  identifier="origin1"
                >
                  <Ionicons name="pin-sharp" size={35} color={color.primary} />
                  <Callout style={{ width: 85 }}>
                    <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 16, }}>{origin.title}</Text>
                  </Callout>
                </Marker>
              )
            }

            {
              destination?.location && (
                <Marker
                  coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                  }}
                  identifier="destination1"
                >
                  <Ionicons name="pin-sharp" size={35} color="black" />
                  <Callout style={{ width: 85 }}>
                    <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 17, }}>{destination.title}</Text>
                  </Callout>
                </Marker>
              )
            }

          </MapView>




          <BottomSheet
            disabled={modalOpen}
            snapPoints={snapPoints1}
            overDragResistanceFactor={0}
            backgroundStyle={{
              borderRadius: 30, shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.2,
              shadowRadius: 2,
            }}
            handleIndicatorStyle={{
              backgroundColor: 'lightgrey',
              height: 3
            }}
          >
            <View style={styles.truckSelectionContainer}>

              <Text style={{ fontSize: 24, fontFamily: 'Manrope_700Bold', marginBottom: 10 }}>Select Truck</Text>

              {/* <FlatList
                data={carTypes}
                horizontal
                bounces={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                    <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '70%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active ? "#F76A03" : "#CFCFCF", backgroundColor: active ? "#FFE3CE" : '#F1F1F1' }} onPress={sActive}>
                      <View style={styles.iconView}>
                        <Image source={item.image } style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: active ? 1 : 0.5 }} />
                      </View>

                      <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: active ? 'black' : '#7D7878', textAlign: 'center' }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                }
              /> */}
              <View style={{ flexDirection: 'row', marginBottom: 10, height: '30%', justifyContent: 'space-between' }}>
                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '23%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active ? "#F76A03" : "#AFAFAF", backgroundColor: active ? "#FFE3CE" : '#F1F1F1' }} onPress={sActive}>
                  <View style={styles.iconView}>
                    <Image source={small} style={{ width: '100%', height: '100%', resizeMode: "contain" }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: 'black', textAlign: 'center' }}>
                    Small
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '23%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active1 ? "#F76A03" : "#AFAFAF", backgroundColor: active1 ? "#FFE3CE" : '#F1F1F1' }} onPress={mActive}>
                  <View style={styles.iconView}>
                    <Image source={medium} style={{ width: '100%', height: '100%', resizeMode: "contain" }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: 'black', textAlign: 'center' }}>
                    Medium
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '23%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active2 ? "#F76A03" : "#AFAFAF", backgroundColor: active2 ? "#FFE3CE" : '#F1F1F1' }} onPress={lActive}>
                  <View style={styles.iconView}>
                    <Image source={large} style={{ width: '100%', height: '100%', resizeMode: "contain" }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: 'black', textAlign: 'center' }}>
                    Large
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity disabled={modalOpen} style={{ height: '100%', width: '23%', borderRadius: 15, borderWidth: 1.5, alignItems: 'center', justifyContent: "center", borderColor: active3 ? "#F76A03" : "transparent", backgroundColor: active3 ? "#FFE3CE" : '#F1F1F1' }} onPress={hActive}>
                  <View style={styles.iconView}>
                    <Image source={huge} style={{ width: '100%', height: '100%', resizeMode: "contain", opacity: 0.4 }} />
                  </View>

                  <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 15, color: '#CFCFCF', textAlign: 'center' }}>
                    Huge
                  </Text>
                </TouchableOpacity>
              </View>




              <View style={styles.tripInfo} >
                <View style={styles.tripText}>

                  <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name="flag-variant" size={24} color="#F76A03" />
                    <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 5 }}>{travelTimeInformation?.distance.text} ({travelTimeInformation?.duration.text})</Text>

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
                      active && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 5 }}>1 t(tonne)</Text>
                    }
                    {
                      active1 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>1,5 t(tonnes)</Text>
                    }
                    {
                      active2 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>2,5 t(tonnes)</Text>
                    }
                    {
                      active3 && <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 3 }}>9 t (tonnes)</Text>
                    }
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    {/* <MaterialCommunityIcons name="currency-usd" size={24} color="#F76A03" /> */}
                    <Text style={{ fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginLeft: 5 }}>
                      {
                        new Intl.NumberFormat('en-IN', {
                          style: 'currency',
                          currency: 'GHC'
                        }).format(
                          (travelTimeInformation?.duration.value * searchChargeRate * truckPrice) / 100
                        )
                      }
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.tripAddressNTime} >
                <View style={styles.tripDesign}>
                  <View style={{ alignItems: 'center' }}>
                    <View style={styles.circle}></View>
                    <View style={styles.line}></View>
                    <View style={styles.rectangle}></View>
                  </View>
                </View>

                <View style={styles.tripText1}>
                  <View style={{ width: '93%', height: "50%" }}>
                    <View >
                      <Text style={{ fontSize: 13, fontFamily: 'Manrope_700Bold', textAlign: 'left', color: 'grey', marginBottom: 0 }}>Pickup</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 17, fontFamily: 'Manrope_700Bold', textAlign: 'left', marginTop: -3 }}>{origin.title}</Text>
                      <Text style={{ fontSize: 17, fontFamily: 'Manrope_700Bold', marginTop: -3 }}>{currentDate}</Text>
                    </View>
                  </View>
                  <View style={{ width: '93%', height: "50%" }}>
                    <View >
                      <Text style={{ fontSize: 13, fontFamily: 'Manrope_700Bold', textAlign: 'left', color: 'grey' }}>Drop-off</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', }}>
                      <Text style={{ fontSize: 17, fontFamily: 'Manrope_700Bold', textAlign: 'left', marginTop: -3 }}>{destination.title}</Text>
                      <Text style={{ fontSize: 17, fontFamily: 'Manrope_700Bold', marginTop: -3 }}>{estimatedTime}</Text>
                    </View>
                  </View>
                  {/* <View>
                    <View style={{ width: '93%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                      <Text style={{ fontSize: 19, fontFamily: 'Manrope_600SemiBold', marginLeft: 5, textAlign: 'right' }}>{destination.title}</Text>
                      <Text style={{ fontSize: 19, fontFamily: 'Manrope_700Bold', marginLeft: 5 }}>{estimatedTime}</Text>
                    </View>
                    <View style={{ width: '93%', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                      <Text style={{ fontSize: 19, fontFamily: 'Manrope_600SemiBold', marginLeft: 5, textAlign: 'right' }}>{destination.title}</Text>
                      <Text style={{ fontSize: 19, fontFamily: 'Manrope_700Bold', marginLeft: 5 }}>{estimatedTime}</Text>
                    </View>
                  </View> */}
                </View>

              </View>

              <TouchableOpacity style={{ height: '16%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onPress={handlePresentModalPress}>
                <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                  <View style={{ width: 53, height: '100%', backgroundColor: "#F1F1F1", justifyContent: "center", alignItems: "center", borderRadius: 15, marginRight: 10 }}>
                    {
                      active4 ? (
                        <Image source={cash} style={{ width: 24, height: 22, borderRadius: 5 }} />
                      ) : (
                        <MaterialCommunityIcons name="credit-card" size={22} color="black" />
                      )
                    }

                  </View>
                  {
                    active4 ? (
                      <Text style={{ fontSize: 17, fontFamily: 'Manrope_700Bold' }}>Cash</Text>
                    ) : (
                      <Text style={{ fontSize: 17, fontFamily: 'Manrope_700Bold' }}>{userData.cardNumber}</Text>
                    )
                  }

                </View>
                <Feather name="chevron-right" size={24} color="black" />

              </TouchableOpacity>



            </View>

          </BottomSheet>


          <View style={styles.backAndButton}>
            <TouchableOpacity style={styles.backButton} onPress={() => { navigation.goBack() }}>
              <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" />
            </TouchableOpacity>
            <View style={{ width: '80%' }}>


              {/* {
                active1 && loading ? (
                  <RegularButton><MaterialIndicator color='white' size={18} trackWidth={30 / 10} /></RegularButton>
                ) : (
                  <RegularButton onPress={() => {
                    setTimeout(() => {
                      navigation.navigate('LocationsPage');
                    }, 2000)
                    setLoading(true);
                  }}>{selectTruck}</RegularButton>
                )
               
                 
              }
              {
                active2 && loading ? (
                  <RegularButton><MaterialIndicator color='white' size={18} trackWidth={30 / 10} /></RegularButton>
                ) : (
                  <RegularButton onPress={() => {
                    setTimeout(() => {
                      navigation.navigate('LocationsPage');
                    }, 2000)
                    setLoading(true);
                  }}>{selectTruck}</RegularButton>
                )
               
                 
              }
              {
                active3 && loading ? (
                  <RegularButton><MaterialIndicator color='white' size={18} trackWidth={30 / 10} /></RegularButton>
                ) : (
                  <RegularButton onPress={() => {
                    setTimeout(() => {
                      navigation.navigate('LocationsPage');
                    }, 2000)
                    setLoading(true);
                  }}>{selectTruck}</RegularButton>
                )
               
                 
              } */}
              {
                active && <RegularButton disabled={disabledBtn} onPress={() => {
                  setSelectTruck(<MaterialIndicator color='white' size={18} trackWidth={30 / 10} />);
                  setDisabledBtn(true);
                  setTimeout(() => {
                    navigation.navigate('LocationsPage')
                  }, 2000)
                }}>{selectTruck}</RegularButton>
              }
              {
                active1 && <RegularButton disabled={disabledBtn} onPress={() => {
                  setSelectTruck(<MaterialIndicator color='white' size={18} trackWidth={30 / 10} />);
                  setDisabledBtn(true);
                  setTimeout(() => {
                    navigation.navigate('LocationsPage')
                  }, 2000)
                }}>{selectTruck}</RegularButton>
              }
              {
                active2 && <RegularButton disabled={disabledBtn} onPress={() => {
                  setSelectTruck(<MaterialIndicator color='white' size={18} trackWidth={30 / 10} />);
                  setDisabledBtn(true);
                  setTimeout(() => {
                    navigation.navigate('LocationsPage')
                  }, 2000)
                }}>{selectTruck}</RegularButton>
              }
              {
                active3 && <RegularButton disabled={disabledBtn} onPress={() => {
                  setSelectTruck(<MaterialIndicator color='white' size={18} trackWidth={30 / 10} />);
                  setDisabledBtn(true);
                  setTimeout(() => {
                    navigation.navigate('LocationsPage');
                  }, 2000)
                }}>{selectTruck}</RegularButton>
              }


            </View>
          </View>

          <StatusBar style="dark" />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={{ borderRadius: 20, backgroundColor: '#E8E9EB' }}
          handleIndicatorStyle={{
            backgroundColor: 'lightgrey',
            height: 3
          }}
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

            {
              userData.cardAdded &&
              <TouchableOpacity style={styles.option} onPress={cardActive}>
                <View style={styles.iconView2}>
                  <MaterialCommunityIcons name="credit-card" size={22} color="black" />
                </View>

                <View style={{ width: '70%', paddingLeft: 15 }}>
                  <Text style={styles.optionText}>
                    {userData.cardNumber}
                  </Text>
                </View>

                <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <MaterialCommunityIcons name={!active5 ? "radiobox-blank" : "radiobox-marked"} size={24} color={color.primary} />
                </View>
              </TouchableOpacity>
            }


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
    height: '35%',
    width: '100%',
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: "space-between",
  },
  tripAddressNTime: {
    height: '37%',
    width: '100%',
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  tripText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  tripText1: {
    width: '100%',
  },
  tripDesign: {
    flexDirection: 'row',
    width: '7%',
  },
  circle: {
    width: 11, height: 11, borderRadius: 100 / 2, borderWidth: 3, borderColor: 'black'
  },
  line: {
    width: 2, height: 35, backgroundColor: 'black'
  },
  rectangle: {
    width: 10, height: 10, borderWidth: 3.5, borderColor: 'black'
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





