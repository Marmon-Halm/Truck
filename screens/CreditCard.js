import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { StatusBarHeight } from '../componets/shared';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import mtn from '../assets/mtn.jpg';
import voda from '../assets/voda.png';
import creditc from '../assets/credit.jpg';
import StyledInput from '../componets/Inputs/StyledInput';
import RegularTexts from '../componets/Texts/RegularTexts';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import BottomButton from '../componets/Buttons/BottomButton';
import useUser from '../hook/useUser';
import ToastrSuccess from '../componets/Toastr Notification/ToastrSuccess';
import { db } from '../config';
import { setDoc, doc, uid, updateDoc } from '@firebase/firestore';
import { MaterialIndicator } from 'react-native-indicators';
import { useDispatch } from 'react-redux';
import { setCardNumbers } from '../slices/navSlice';



const CreditCard = (params) => {
    const navigation = params.navigation;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [enableBtn, setEnableBtn] = useState(false)
    const dispatch = useDispatch();
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");
    const [toastrVisible, setToastrVisible] = useState(false);
    const { userData, isLoading: isUserDataLoading } = useUser();
    const [bodyText, setBodyText] = useState('');
    const [disabledBtn, setDisabledBtn] = useState(false);

    const showToastr = (bodyText) => {
        setBodyText(bodyText);
    }

    const successToastr = () => {
        setTimeout(() => {
            setToastrVisible(false);
        }, 4000)
        setToastrVisible(true);
        return showToastr('Card Details Saved!');
    };

    const saveCardDetails = async () => {
        setDisabledBtn(true);
        const userID = doc(db, "users", userData.uid)
        await updateDoc(userID, {
            ccDetails: [cardDetails = {cardName, cardCVC, cardExpiry}],
            cardNumber: cardNumber,
        });

        setTimeout(() => {
            setDisabledBtn(false)
            successToastr();
            setCardCVC("");
            setCardName("");
            setCardNumber("");
            setCardExpiry("");
            setEnableBtn(false);
        }, 3000)

    };
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

        <View style={{ height: windowHeight, width: windowWidth, paddingTop: StatusBarHeight, backgroundColor: "#ffffff", paddingHorizontal: 20 }}>

            <View style={styles.topNav}>
                <View style={{ width: "10%" }}>
                    <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" onPress={() => {
                        navigation.goBack()
                    }} />
                </View>
                <View style={{ width: "80%" }}>
                    <Text style={styles.textCreditCard}>
                        Add New Card
                    </Text>
                </View>
                <View style={{ width: "10%" }}>
                </View>
            </View>
            <View style={styles.cardView}>
                <Image source={creditc} style={{ width: '100%', height: '100%', borderRadius: 20 }} />
            </View>


            <KeyboardAvoiding>
                <View style={styles.cardDetails}>
                    <View style={styles.cardInput}>
                        <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_700Bold' }}>Cardholder Name</RegularTexts>
                        <StyledInput
                            icon="account-outline"
                            keyboardAppearance="light"
                            onChangeText={(text) => {
                                setCardName(text);
                                setEnableBtn(true);
                            }}
                            enablesReturnKeyAutomatically={true}
                            value={cardName}
                        />
                    </View>

                    <View style={styles.cardInput}>
                        <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_700Bold' }}>Card Number</RegularTexts>
                        <StyledInput
                            icon="credit-card-outline"
                            keyboardType="numeric"
                            keyboardAppearance="light"
                            inputMode='numeric'
                            returnKeyType='done'
                            isCard={true}
                            onChangeText={(text) => {
                                setCardNumber(text);
                                setEnableBtn(true);
                            }}
                            value={cardNumber}
                            minLength={1}
                            maxLength={16}

                        />
                    </View>

                    <View style={styles.cardInputDivided}>
                        <View style={{ width: '45%' }}>
                            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_700Bold' }}>Expiry Date</RegularTexts>
                            <StyledInput
                                keyboardType="numeric"
                                keyboardAppearance="light"
                                inputMode='numeric'
                                returnKeyType='done'
                                onChangeText={(text) => {
                                    setCardExpiry(text);
                                    setEnableBtn(true);
                                }
                                }
                                value={cardExpiry}
                                minLength={1}
                                maxLength={4}
                            />
                        </View>

                        <View style={{ width: '45%' }}>
                            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_700Bold' }}>CVV</RegularTexts>
                            <StyledInput
                                isMat={true}
                                keyboardType="numeric"
                                keyboardAppearance="light"
                                inputMode='numeric'
                                returnKeyType='done'
                                onChangeText={(text) => {
                                    setCardCVC(text);
                                    setEnableBtn(true);
                                }
                                }
                                value={cardCVC}
                                minLength={1}
                                maxLength={3}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoiding>

            {!disabledBtn && <BottomButton disabled={!enableBtn} style={{ opacity: enableBtn ? 1 : 0.3, width: '100%' }} onPress={saveCardDetails}>Save Card Details</BottomButton>}
            {disabledBtn && 
                <BottomButton disabled={disabledBtn} style={{ alignItems: 'center', width: '100%' }}>
                    <MaterialIndicator color='white' size={18} trackWidth={30 / 10} />
                </BottomButton>
            }

            {
                toastrVisible ? (<ToastrSuccess
                    bodyText={bodyText}
                />
                ) : null

            }

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
    textCreditCard: {
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold',
        marginHorizontal: 10,
        textAlign: "center"
    },
    cardView: {
        marginTop: 10,
        marginBottom: 10,
        height: '30%',
        backgroundColor: 'grey',
        borderRadius: 20,
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
    cardDetails: {
        marginTop: 30,
        width: '100%',
    },
    cardInput: {
        marginBottom: 20,
    },
    cardInputDivided: {
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


});

export default CreditCard;

