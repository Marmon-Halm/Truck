import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { StatusBarHeight } from '../componets/shared';
import { useFonts, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInLeft, FadeInRight, FadeInUp, FadeOutDown, FadeOutLeft, FadeOutRight, FadeOutUp } from "react-native-reanimated";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const Location = (params) => {
    const navigation = params.navigation;

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
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutDown}
        >
            <View style={{ height: '100%', width: windowWidth, paddingTop: StatusBarHeight, backgroundColor: "#F6F6F6", paddingHorizontal: 20 }}>
                <View style={styles.topNav}>
                    <View style={{ width: "10%" }}>
                        <AntDesign name="close" size={26} style={{ textAlign: "left" }} color="black" onPress={() => {
                            navigation.goBack()
                        }} />
                    </View>

                </View>

                <View style={styles.searchButton}>
                    {/* <MaterialCommunityIcons name="map-marker" size={22} color="#737373" /> */}
                    <GooglePlacesAutocomplete
                        placeholder='Pick Up Location'
                        onPress={(data, details = null) => {
                            console.log(data)
                        }}
                        selectProps={{
                            value,
                            onChange: setValue,
                        }}
                        returnKeyType={'search'}
                        minLength={2}
                        keyboardAppearance="light"
                        listViewDisplayed={true}
                        autoFocus="true"
                        query={{
                            key: 'AIzaSyA25oUM8BiNy3Iuv4QaLDTU4YzbZxmZUX4',
                            language: 'en',
                        }}
                        textInputProps={{
                            placeholderTextColor: "#737373",
                            returnKeyType: "search"
                        }}
                        styles={{
                            textInput: {
                                height: '100%',
                                color: '#737373',
                                fontSize: 16,
                                backgroundColor: '#FAFAFA',
                                fontFamily: "Manrope_500Medium",
                            },

                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                            listView: {
                                top: 45.5,
                                zIndex: 10,
                                position: 'absolute',
                                color: 'black',
                                backgroundColor: "red",
                                width: '100%',
                            },
                            separator: {
                                flex: 1,
                                backgroundColor: '#F76A03',
                            },
                            description: {
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 17,
                                maxWidth: '100%',
                                fontFamily: 'Manrope_500Medium'
                            },
                        }}
                    />
                </View>

                <View style={styles.searchButton}>
                    {/* <MaterialCommunityIcons name="map-marker" size={22} color="#737373" /> */}
                    <GooglePlacesAutocomplete
                        placeholder='Drop Off'
                        onPress={(data, details = null) => {
                            console.log(data, details)
                        }}
                        returnKeyType={'search'}
                        minLength={2}
                        keyboardAppearance="light"
                        listViewDisplayed={true}
                        query={{
                            key: 'AIzaSyA25oUM8BiNy3Iuv4QaLDTU4YzbZxmZUX4',
                            language: 'en',
                        }}
                        textInputProps={{
                            placeholderTextColor: "#737373",
                            returnKeyType: "search"
                        }}
                        styles={{

                            textInput: {
                                height: '100%',
                                color: '#000',
                                fontSize: 16,
                                backgroundColor: '#FAFAFA',
                                fontFamily: "Manrope_500Medium",
                            },

                            predefinedPlacesDescription: {
                                color: '#1faadb',
                            },
                            listView: {
                                top: 45.5,
                                zIndex: 10,
                                position: 'absolute',
                                color: 'black',
                                backgroundColor: "red",
                                width: '100%',
                            },
                            separator: {
                                flex: 1,
                                backgroundColor: '#F76A03',
                            },
                            description: {
                                flexDirection: "row",
                                flexWrap: "wrap",
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 17,
                                maxWidth: '100%',
                                fontFamily: 'Manrope_500Medium'
                            },
                        }}
                    />
                </View>


                <StatusBar style="dark" />


            </View>


        </Animated.View>


    );

};

const styles = StyleSheet.create({
    topNav: {
        width: '100%',
        flexDirection: "row",
        paddingVertical: 10
    },
    searchButton: {
        height: 42,
        width: "100%",
        flexDirection: "row",
        //paddingHorizontal: 10,
        marginVertical: 5,
        borderWidth: 1.5,
        borderColor: '#737373',
        backgroundColor: "#FAFAFA",
        alignItems: "center"
    },

});

export default Location;




