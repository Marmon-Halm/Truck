import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation, } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GOOGLE_MAPS_APIKEY } from "@env";
import marker from '../assets/marker.png';
import sm from '../assets/sm.png';
import md from '../assets/md.png';
import lg from '../assets/lg.png';
import hg from '../assets/hg.png';
import { color } from './color';
import TitleText from '../componets/Texts/TitleText';
import useUser from '../hook/useUser';
import RegularTexts from '../componets/Texts/RegularTexts';
import RegularButton from '../componets/Buttons/RegularButton';


const WaitingForDriver = (params) => {
    const navigation = params.navigation;
    const [location, setLocation] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const { userData, isLoading: isUserDataLoading } = useUser();
    const windowHeight = Dimensions.get('window').height;
    const [dataIn, setDataIn] = useState(false);
    const [userPhoto, setUserPhoto] = useState('');
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const { width, height } = Dimensions.get("window");

    // FONTS
    const [fontsLoaded] = useFonts({
        'Manrope_500Medium': require('../assets/Manrope-Medium.ttf'),
        'Manrope_600SemiBold': require('../assets/Manrope-SemiBold.ttf'),
        'Manrope_700Bold': require('../assets/Manrope-Bold.ttf'),
    })

    const snapPoints1 = useMemo(() => ['41%', '45%'], []);
    const bottomSheetRef = useRef(null);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    const [position, setPosition] = useState({
        latitude: origin.location.lat,
        longitude: origin.location.lng,
    });
    const [destinationPosition, setDestinationPosition] = useState({
        latitude: destination.location.lat,
        longitude: destination.location.lng,
    });


    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={{ height: '100%', width: windowWidth }}>

                <MapView
                    ref={mapRef}
                    style={{ width: width, height: '60%' }}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                        latitudeDelta: 0.045,
                        longitudeDelta: 0.045,
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
                                identifier="mk1"
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
                                identifier="mk2"
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
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints1}
                    overDragResistanceFactor={0}
                    backgroundStyle={{
                        borderRadius: 20, shadowColor: 'grey', shadowOffset: { width: 0, height: -1 },
                        shadowOpacity: 0.2,
                        shadowRadius: 2,
                    }}
                    handleIndicatorStyle={{
                        backgroundColor:'lightgrey',
                        height: 3
                    }}
                >
                    <View style={{ paddingHorizontal: 15, height: '100%' }}>
                        <RegularTexts style={{fontSize: 16, textAlign: 'center'}}>Driver arrives in ~  <RegularTexts style={{color: color.primary, fontSize: 16}}>8 mins</RegularTexts></RegularTexts>
                        <View style={styles.carInformation}>
                            <View style={{ width: '57%', height: '100%', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <TitleText style={{ color: 'black', fontSize: 22, fontFamily: 'Manrope_600SemiBold', marginBottom: 5 }}>GW-2323-22</TitleText>
                                    <View style={{ justifyContent: 'center', width: 55, height: 25, alignItems: 'center', backgroundColor: "#FFE3CE", borderWidth: 1, borderColor: color.primary, borderRadius: 5 }}>
                                        <Text style={{ fontSize: 12, fontFamily: 'Manrope_500Medium' }}>Small</Text>
                                    </View>
                                </View>
                                <RegularTexts style={{ fontSize: 16 }}>Ford F150 ~ White</RegularTexts>
                            </View>
                            <View style={{ width: '43%', height: '100%' }}>
                                <Image source={sm} style={{ width: '100%', height: '100%', resizeMode: "contain", alignSelf: 'flex-end', flex: 1 }} />
                            </View>

                        </View>

                        <View style={styles.driverInformation}>
                            <View style={{ width: '18%', height: '100%', backgroundColor: 'grey', borderRadius: 10 }}>
                                <Image source={{ uri: userData.photoUri }} style={{ width: '100%', height: '100%',borderRadius: 10 }} />
                            </View>

                            <View style={{ width: '55%', height: '100%', justifyContent: 'space-evenly', paddingVertical: 8}}>
                                <TitleText style={{ color: 'black', fontSize: 18, fontFamily: 'Manrope_600SemiBold', marginBottom: 5 }}>Johnny Boateng</TitleText>
                                <RegularTexts style={{ fontSize: 16 }}>5 star driver</RegularTexts>
                            </View>
                            <View style={{ width: '22%', height: '100%',justifyContent: 'center', alignItems: 'flex-end'}}>
                                <TouchableOpacity style={styles.backButton}>
                                    <MaterialCommunityIcons name="phone" size={25} color="black" />
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

                </BottomSheet>


                <StatusBar style="dark" />
                <View style={styles.backAndButton}>
                    <View style={{ width: '100%' }}>
                        <RegularButton >Cancel</RegularButton>
                    </View>
                </View>
            </View>
        </GestureHandlerRootView>



    );

};

const styles = StyleSheet.create({
    // topNav: {
    //     width: '90%',
    //     height: '8%',
    //     position: 'absolute',
    //     alignItems: 'center',
    //     bottom: 60,
    //     left: 20,
    //     borderRadius: 15,
    //     paddingHorizontal: 20,
    //     backgroundColor: '#F1F1F1',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     shadowColor: 'grey',
    //     shadowOffset: { width: 2, height: 2 },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 2,
    //     elevation: 10,
    // },
    carInformation: {
        height: 80,
        borderWidth: 1.3,
        borderColor: 'lightgray',
        borderRadius: 15,
        paddingVertical: 12,
        paddingLeft: 12,
        backgroundColor: 'white',
        paddingRight: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 10,
    },
    driverInformation: {
        height: 80,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backAndButton: {
        height: 110,
        borderTopWidth: 1,
        borderColor: 'lightgrey',
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

});

export default WaitingForDriver;




