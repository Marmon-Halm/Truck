import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { StatusBarHeight } from '../componets/shared';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import mtn from '../assets/mtn.jpg';
import voda from '../assets/voda.png';


const Payment = (params) => {
    const navigation = params.navigation;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [active, setActive] = useState(false);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);

    const mtnActive = () => {

        if (active1 == true || active2 == true) {
            setActive1(false);
            setActive2(false);
            setActive(true);
        };
    }

    const vodaActive = () => {
        if (active == true || active2 == true) {
            setActive(false);
            setActive(false);
            setActive1(true);
        } else {
            setActive1(true);
        }
    }

    const cardActive = () => {
        if (active == true || active1 == true) {
            setActive1(false);
            setActive(false);
            setActive2(true);
        };
    }
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
        <View style={{ height: windowHeight, width: windowWidth, paddingTop: StatusBarHeight, backgroundColor: "#F6F6F6", paddingHorizontal: 20 }}>

            <View style={styles.topNav}>
                <View style={{ width: "10%" }}>
                    <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" onPress={() => {
                        navigation.goBack()
                    }} />
                </View>
                <View style={{ width: "80%" }}>
                    <Text style={styles.textSettings}>
                        Payment Methods
                    </Text>
                </View>
                <View style={{ width: "10%" }}>
                </View>
            </View>

            <View style={styles.paymentOptions}>

                {/* <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("Momo") }}>
                    <View style={styles.iconView}>
                        <Image source={mtn} style={{ width: 24, height: 22, borderRadius: 5 }} />
                    </View>

                    <View style={{ width: '70%', paddingLeft: 15 }}>
                        <Text style={styles.optionText}>
                            MTN Mobile Money
                        </Text>
                    </View>

                    <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Feather name="chevron-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("VodaCash") }}>
                    <View style={styles.iconView}>
                        <Image source={voda} style={{ width: 24, height: 22, borderRadius: 5 }} />
                    </View>

                    <View style={{ width: '70%', paddingLeft: 15 }}>
                        <Text style={styles.optionText}>
                            Vodafone Cash
                        </Text>
                    </View>

                    <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Feather name="chevron-right" size={24} color="black" />
                    </View>
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.option} onPress={() => { navigation.navigate("CreditCard") }}>
                    <View style={styles.iconView}>
                        <MaterialCommunityIcons name="credit-card" size={22} color="black" />
                    </View>

                    <View style={{ width: '70%', paddingLeft: 15 }}>
                        <Text style={styles.optionText}>
                            Credit / Debit Card
                        </Text>
                    </View>

                    <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <Feather name="chevron-right" size={24} color="black" />
                    </View>
                </TouchableOpacity>
            </View>

            <StatusBar style="dark" />
        </View>

    );

};

const styles = StyleSheet.create({
    topNav: {
        width: '100%',
        flexDirection: "row",
        paddingVertical: 10
    },
    modal: {
        paddingTop: 30,
        paddingLeft: 22,
        paddingRight: 22,
        backgroundColor: '#FFF',
        marginTop: 60, // This is the important style you need to set
        marginRight: 0, // This is the important style you need to set
        marginLeft: 0, // This is the important style you need to set
        marginBottom: 0, // This is the important style you need to set
        alignItems: undefined,
        justifyContent: undefined,
        borderRadius: 20,
        flexDirection: 'column',
    },
    textSettings: {
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold',
        marginHorizontal: 10,
        textAlign: "center"
    },
    paymentOptions: {
        marginTop: 40
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
    iconView: {
        width: '15%',
        height: '100%',
        backgroundColor: "#F6F6F6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
    },

});

export default Payment;




