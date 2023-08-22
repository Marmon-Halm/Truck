import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ImageBackground } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { StatusBarHeight } from '../componets/shared';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';




export default function Trips(params) {
    const navigation = params.navigation;
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

    return (

        <View style={{ paddingTop: StatusBarHeight, backgroundColor: "white",  paddingHorizontal: 20 }}>

            <View style={styles.view3}>

                <View style={{ width: "40%" }}>
                    <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" onPress={() => {
                        navigation.goBack()
                    }} />
                </View>

                <View style={{ width: "70%" }}>
                    <Text style={styles.textHistory}>
                        Trips
                    </Text>
                </View>

            </View>
            <View style={styles.container}>


                <View style={{ width: '100%' }}>

                </View>

                <View style={{ width: "100%", height: 250, marginTop: 100, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/nodata.png')} style={[styles.image]} />

                    <Text style={styles.text1}> No Completed Trips</Text>

                </View>

                {/* <View style={{ paddingHorizontal: 18 }}>

                        <View>
                            <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 18, marginTop: 30, marginBottom: 15 }}> Jan 2024</Text>


                            <View style={styles.tabContainer}>

                                <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 150 / 2, backgroundColor: '#E9E9E9', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                        <FontAwesome5 name="car" size={22} color="black" />
                                    </View>

                                </View>

                                <View style={{ width: '65%', paddingHorizontal: 5 }}>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 17, marginBottom: 3 }}>Legon E Rd, Accra</Text>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 13, color: '#5F5959' }}>13 Jan, 1:34</Text>
                                </View>

                                <View style={styles.tab}>
                                    <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 18 }}>₵56.00</Text>
                                </View>

                            </View>
                            <View style={styles.tabContainer}>

                                <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 150 / 2, backgroundColor: '#E9E9E9', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                        <FontAwesome5 name="car" size={22} color="black" />
                                    </View>

                                </View>

                                <View style={{ width: '65%', paddingHorizontal: 5 }}>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 17, marginBottom: 3 }}>127b Spintex Rd, Accra</Text>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 13, color: '#5F5959' }}>5 Jan, 09:12</Text>
                                </View>

                                <View style={styles.tab}>
                                    <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 18 }}>₵21.00</Text>
                                </View>

                            </View>
                        </View>




                        <View>
                            <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 18, marginTop: 30, marginBottom: 15 }}> Dec 2023</Text>


                            <View style={styles.tabContainer}>

                                <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'flex-start', }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 150 / 2, backgroundColor: '#E9E9E9', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                        <FontAwesome5 name="car" size={22} color="black" />
                                    </View>

                                </View>

                                <View style={{ width: '65%', paddingHorizontal: 5 }}>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 17, marginBottom: 3 }}>Legon E Rd, Accra</Text>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 13, color: '#5F5959' }}>13 Jan, 1:34</Text>
                                </View>

                                <View style={styles.tab}>
                                    <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 18 }}>₵56.00</Text>
                                </View>

                            </View>
                            <View style={styles.tabContainer}>

                                <View style={{ width: '15%', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <View style={{ width: 40, height: 40, borderRadius: 150 / 2, backgroundColor: '#E9E9E9', alignItems: 'center', alignContent: 'center', justifyContent: 'center' }}>
                                        <Feather name="x" size={24} color="#ff0000" />
                                    </View>

                                </View>

                                <View style={{ width: '65%', paddingHorizontal: 5 }}>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 17, marginBottom: 3 }}>Hospital Rd, Tema</Text>
                                    <Text style={{ fontFamily: 'Manrope_500Medium', fontSize: 13, color: '#5F5959' }}>22 Dec, 21:02</Text>
                                </View>

                                <View style={styles.tab}>
                                    <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 18 }}>₵80.00</Text>
                                </View>

                            </View>
                        </View>

                    </View> */}





                <StatusBar style="dark" />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '100%',
        width: "100%",
    },
    view3: {
        width: '100%',
        flexDirection: "row",
        paddingVertical: 10
    },
    image: {
        justifyContent: "center",
        width: "100%",
        height: "80%",
        resizeMode: 'contain'
    },
    tab: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    tabContainer: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#BCBCBC',
        paddingVertical: 5,
        marginTop: 5
    },
    textHistory: {
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold',
        marginHorizontal: 10,
        textAlign: "left"
    },
    text1: {
        justifyContent: "center",
        fontSize: 20,
        color: 'black',
        fontFamily: 'Manrope_600SemiBold',
    },

});
