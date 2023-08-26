import React, { useEffect, useRef, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { MaterialIndicator } from 'react-native-indicators';
import * as Location from 'expo-location';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination, selectOrigin, selectTravelTimeInformation, setTravelTimeInformation, } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from "@env";
import marker from '../assets/marker.png';
import flag from '../assets/flag.png';
import { color } from './color';


const LocationsPage = (params) => {
    const navigation = params.navigation;
    const [location, setLocation] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [dataIn, setDataIn] = useState(false);
    const [value, setValue] = useState("");
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const { width, height } = Dimensions.get("window");
    const [position, setPosition] = useState({
        latitude: origin.location.lat,
        longitude: origin.location.lng,
    });
    const [destinationPosition, setDestinationPosition] = useState({
        latitude: destination.location.lat,
        longitude: destination.location.lng,
    });

    // FONTS
    const [fontsLoaded] = useFonts({
        'Manrope_500Medium': require('../assets/Manrope-Medium.ttf'),
        'Manrope_600SemiBold': require('../assets/Manrope-SemiBold.ttf'),
        'Manrope_700Bold': require('../assets/Manrope-Bold.ttf'),
    })

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('WaitingForDriver');
        }, 6000)
    }, [])

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }


    return (
        <View style={{ height: '100%', width: windowWidth }}>


            <MapView
                ref={mapRef}
                style={{ width: width, height: '100%' }}
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


            <View style={styles.topNav}>
                <Text style={{ fontSize: 22, fontFamily: 'Manrope_600SemiBold', }}>Looking for a vehicle</Text>
                <View>
                    <MaterialIndicator color='black' size={24} trackWidth={40 / 10} />
                </View>
            </View>
            <StatusBar style="dark" />
        </View>


    );

};

const styles = StyleSheet.create({
    topNav: {
        width: '90%',
        height: '8%',
        position: 'absolute',
        alignItems: 'center',
        bottom: 60,
        left: 20,
        borderRadius: 15,
        paddingHorizontal: 20,
        backgroundColor: '#F1F1F1',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 10,
    },

});

export default LocationsPage;




