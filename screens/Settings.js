import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, db } from '../config';
import { UserContext } from '../contexts/UserContext';
import { StatusBarHeight } from '../componets/shared';
import cash from '../assets/cash.png';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomButton from '../componets/Buttons/BottomButton';
import { color } from './color';
import useUser from '../hook/useUser';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { doc, updateDoc } from '@firebase/firestore';
import { selectCardNumbers } from '../slices/navSlice';
import { useSelector } from 'react-redux';


export default function Settings(params) {

    const navigation = params.navigation;
    const [loggingOut, setLoggingOut] = useState(false);
    const { userData, isLoading: isUserDataLoading } = useUser();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const { setUserLoggedIn, setPreviouslyLoggedIn } = useContext(UserContext);
    const [active, setActive] = useState(true);
    const [active1, setActive1] = useState(false);
    const [active2, setActive2] = useState(false);
    const [active3, setActive3] = useState(false);
    const [userPhoto, setUserPhoto] = useState('');
    const [creditcardNumber, setCreditcardNumber] = useState("");
    const [creditCardIn, setCreditCardIn] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (userData.ccSelected == true ) {
            setActive(false);
            setActive3(true);
        }

    }, [userData, isUserDataLoading])


    const cashActive = async () => {
        if (active3 == true) {
            setActive1(false);
            setActive2(false);
            setActive3(false);
            setActive(true);

            const userID = doc(db, "users", userData.uid)
            await updateDoc(userID, {
                ccSelected: false
            });
        }
    }

    const cardActive = async () => {
        if (active == true) {
            setActive1(false);
            setActive(false);
            setActive2(false);
            setActive3(true);

            const userID = doc(db, "users", userData.uid)
            await updateDoc(userID, {
                ccSelected: true
            });
        };
    }

    const loadData = () => {
        setTimeout(() => {
            const newN = userData.cardNumber;
            const newSelected = userData.cardAdded;
           // console.log(userData.phoneNumber);
            if (userData) {
                setUserPhoto(userData.photoUri);
                setCreditcardNumber(newN);
            }

            if ( newSelected == false ) {
                setCreditCardIn(false);
            } else {
                setCreditCardIn(true)
            }


        }, 2000)
    }

    loadData();

    const bottomSheetModalRef = useRef(null);
    // variables
    const snapPoints = useMemo(() => ['75%', '75%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
        setModalOpen(true);
    }, []);
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);


    const onLogOut = () => {
        setPreviouslyLoggedIn(true);
        setLoggingOut(true);
        signOut(auth)
            .then(() => {
                setUserLoggedIn(false);
                console.log('sign out')
            })
            .catch((error) => {
                console.log(error.message)
            });

        // clear user credentials
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider style={{ flex: 1 }}>
                <View style={{ height: windowHeight, width: windowWidth, paddingTop: StatusBarHeight, backgroundColor: "#F6F6F6", paddingHorizontal: 10, opacity: modalOpen ? 0.3 : 1 }}>

                    <View style={styles.topNav}>

                        <View style={{ width: "10%" }}>
                            <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} disabled={modalOpen} color="black" onPress={() => {
                                navigation.goBack()
                            }} />
                        </View>

                        <View style={{ width: "80%" }}>
                            <Text style={styles.textSettings}>
                                Settings
                            </Text>
                        </View>
                        <View style={{ width: "10%" }}>

                        </View>

                    </View>

                    <View style={{ paddingHorizontal: 20 }}>
                        <View style={{ width: '100%', alignItems: 'center', marginBottom: 35, marginTop: 20 }}>
                            <View style={{ width: 120, height: 120, borderRadius: 120 / 2, backgroundColor: '#E8E8E8', alignItems: 'center', justifyContent: 'center', marginBottom: 15 }}>
                                {/* <AntDesign name="user" size={45} color="#787878" /> */}
                                {userData.photoUri && <Image source={{ uri: userData.photoUri }} style={{ width: '100%', height: '100%', borderRadius: 120 / 2, }} />}
                            </View>

                            <Text style={styles.profileText}>{userData.firstName}</Text>
                            <Text style={styles.profileText2}>{userData.phoneNumber}</Text>

                        </View>



                    </View>

                    <View style={styles.contentView}>
                        <TouchableOpacity style={styles.categoryContainer} onPress={() => { navigation.navigate("EditProfile") }}>
                            <View style={styles.iconView}>
                                <MaterialCommunityIcons name="account-edit" size={22} color="#F76A03" />
                            </View>

                            <View style={{ width: '70%', paddingLeft: 15 }}>
                                <Text style={styles.categoryText}>
                                    Edit Profile
                                </Text>
                            </View>

                            <View style={{ width: '19%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Feather name="chevron-right" size={24} color="black" />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryContainer} onPress={() => { navigation.navigate("Trips") }}>
                            <View style={styles.iconView}>
                                <MaterialCommunityIcons name="car-clock" size={22} color="#F76A03" />
                            </View>

                            <View style={{ width: '70%', paddingLeft: 15 }}>
                                <Text style={styles.categoryText}>
                                    Trips
                                </Text>
                            </View>

                            <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Feather name="chevron-right" size={24} color="black" />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryContainer} onPress={handlePresentModalPress}>
                            <View style={styles.iconView}>
                                <MaterialCommunityIcons name="wallet-outline" size={22} color="#F76A03" />
                            </View>

                            <View style={{ width: '70%', paddingLeft: 15 }}>
                                <Text style={styles.categoryText}>
                                    Wallet
                                </Text>
                            </View>

                            <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Feather name="chevron-right" size={24} color="black" />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.categoryContainer} onPress={onLogOut}>
                            <View style={styles.iconView}>
                                <MaterialCommunityIcons name="arrow-right-thick" size={22} color="#F76A03" />
                            </View>

                            <View style={{ width: '70%', paddingLeft: 15 }}>
                                <Text style={styles.categoryText}>
                                    Log out
                                </Text>
                            </View>

                            <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Feather name="chevron-right" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
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
                            <View style={styles.iconView}>
                                <Image source={require('../assets/cash.png')} style={{ width: 24, height: 22, borderRadius: 5 }} />
                            </View>

                            <View style={{ width: '70%', paddingLeft: 15 }}>
                                <Text style={styles.optionText}>
                                    Cash
                                </Text>
                            </View>

                            <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <MaterialCommunityIcons name={!active ? "radiobox-blank" : "radiobox-marked"} size={24} color={color.primary} />
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity style={styles.option} onPress={mtnActive}>
                            <View style={styles.iconView}>
                                <Image source={mtn} style={{ width: 24, height: 22, borderRadius: 5 }} />
                            </View>

                            <View style={{ width: '70%', paddingLeft: 15 }}>
                                <Text style={styles.optionText}>
                                    024 119 8679
                                </Text>
                            </View>

                            <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <MaterialCommunityIcons name={!active1 ? "radiobox-blank" : "radiobox-marked"} size={24} color={color.primary} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.option} onPress={vodaActive}>
                            <View style={styles.iconView}>
                                <Image source={voda} style={{ width: 24, height: 22, borderRadius: 5 }} />
                            </View>

                            <View style={{ width: '70%', paddingLeft: 15 }}>
                                <Text style={styles.optionText}>
                                    050 541 5309
                                </Text>
                            </View>

                            <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <MaterialCommunityIcons name={!active2 ? "radiobox-blank" : "radiobox-marked"} size={24} color={color.primary} />
                            </View>
                        </TouchableOpacity> */}

                        {
                            creditCardIn && <TouchableOpacity style={styles.option} onPress={cardActive}>
                                <View style={styles.iconView}>
                                    <MaterialCommunityIcons name="credit-card" size={22} color="black" />
                                </View>
                                <View style={{ width: '70%', paddingLeft: 15 }}>
                                    <Text style={styles.optionText}>
                                        {creditcardNumber}
                                    </Text>
                                </View>
                                <View style={{ width: '18%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <MaterialCommunityIcons name={!active3 ? "radiobox-blank" : "radiobox-marked"} size={24} color={color.primary} />
                                </View>
                            </TouchableOpacity>
                        }

                    </View>
                    <BottomButton style={{ right: 20, width: '90%' }} onPress={() => { navigation.navigate('CreditCard') }}>Add Credit / Debit Card</BottomButton>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({

    categoryContainer: {
        flexDirection: 'row',
        height: 45,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: "center",
        marginBottom: 30,
    },
    categoryText: {
        fontFamily: 'Manrope_700Bold',
        fontSize: 17,
        color: '#383838',
    },
    topNav: {
        width: '100%',
        flexDirection: "row",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    textSettings: {
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold',
        marginHorizontal: 10,
        textAlign: "center"
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
    iconView: {
        width: '15%',
        height: '100%',
        backgroundColor: "#F6F6F6",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
    },
    textInputLabel: {
        fontSize: 16,
        fontFamily: "Manrope_600SemiBold",
        marginBottom: 4,
        marginLeft: 6,
    },
    profileText: {
        fontSize: 22,
        fontFamily: 'Manrope_700Bold',
        marginBottom: 3,
    },
    profileText2: {
        fontSize: 16,
        color: '#717171',
        fontFamily: 'Manrope_600SemiBold'
    },
    logout: {
        fontSize: 22,
        color: '#BA2F2F',
        fontFamily: 'Manrope_600SemiBold'
    },
    unnecessary: {
        color: "black",
        fontSize: 22,
        marginLeft: 14,
        fontFamily: 'Manrope_800ExtraBold',
        color: `#383838`
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    contentView: {
        height: '65%',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 10,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 30,
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
