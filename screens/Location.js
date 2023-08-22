import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { StatusBarHeight } from '../componets/shared';
import { useFonts, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInLeft, FadeInRight, FadeInUp, FadeOutDown, FadeOutLeft, FadeOutRight, FadeOutUp } from "react-native-reanimated";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MaterialIndicator } from 'react-native-indicators';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';


const Location = (params) => {
    const navigation = params.navigation;

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

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [phoneNumber, setPhoneNumber] = useState("");
    const [value, setValue] = useState("");


    let [fontsLoaded] = useFonts({
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    return (
        <View style={{ height: '100%', width: windowWidth }}>

            <MapView
                style={{ width: '100%', height: '100%' }}
                provider={PROVIDER_GOOGLE}
                initialRegion={position}
                region={position}
                showsUserLocation={true}
            />

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

export default Location;




