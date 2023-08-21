import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { StatusBarHeight } from '../componets/shared';
import { useFonts, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import mtn from '../assets/mtn.jpg';
import voda from '../assets/voda.png';
import creditc from '../assets/credit.jpg';
import StyledInput from '../componets/Inputs/StyledInput';
import RegularTexts from '../componets/Texts/RegularTexts';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import BottomButton from '../componets/Buttons/BottomButton';


const CreditCard = (params) => {
    const navigation = params.navigation;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCVC, setCardCVC] = useState("");

    let [fontsLoaded] = useFonts({
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
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
                            onChangeText={(text) => setCardName(text)}
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
                            onChangeText={(text) => setCardNumber(text)}
                            value={cardNumber}
                            minLength={1}
                            maxLength={14}

                        />
                    </View>

                    <View style={styles.cardInputDivided}>
                        <View style={{ width: '45%' }}>
                            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_700Bold' }}>Expiry Date</RegularTexts>
                            <StyledInput

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
                                onChangeText={(text) => setCardCVC(text)}
                                value={cardCVC}
                                minLength={1}
                                maxLength={3}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoiding>

            <BottomButton>Add New Card</BottomButton>



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

