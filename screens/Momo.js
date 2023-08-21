import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { StatusBarHeight } from '../componets/shared';
import { useFonts, Manrope_600SemiBold, Manrope_700Bold, Manrope_800ExtraBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import TitleText from '../componets/Texts/TitleText';
import RegularTexts from '../componets/Texts/RegularTexts';
import StyledInput from '../componets/Inputs/StyledInput';
import BottomButton from '../componets/Buttons/BottomButton';


const Momo = (params) => {
    const navigation = params.navigation;

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [phoneNumber, setPhoneNumber] = useState("");


    let [fontsLoaded] = useFonts({
        Manrope_600SemiBold,
        Manrope_700Bold,
        Manrope_800ExtraBold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }


    return (
        <View>
            <View style={{ height: '100%', width: windowWidth, paddingTop: StatusBarHeight, backgroundColor: "#fff", paddingHorizontal: 20 }}>
                <View style={styles.topNav}>
                    <View style={{ width: "10%" }}>
                        <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" onPress={() => {
                            navigation.goBack()
                        }} />
                    </View>

                </View>

                <View style={{ marginTop: 10, height: 200 }}>
                    <TitleText style={{ color: '#000', fontSize: 25, marginBottom: 15 }}>MTN Mobile Money</TitleText>
                    <RegularTexts style={{ color: '#6A6A6A', marginBottom: 35 }}>Pay for your trips using MTN Momo. Enter a valid mobile money number to get started</RegularTexts>


                    <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>MTN Momo Number</RegularTexts>
                    <StyledInput
                        icon="phone-outline"
                        keyboardType="numeric"
                        keyboardAppearance="light"
                        inputMode='numeric'
                        returnKeyType='done'
                        onChangeText={(text) => setPhoneNumber(text)}
                        value={phoneNumber}
                        isMomo={true}
                        minLength={1}
                        maxLength={10}
                    />

                </View>


                <StatusBar style="dark" />


            </View>

            <BottomButton style={{ right: 20, width: '90%' }}>Save This Payment</BottomButton>
        </View>


    );

};

const styles = StyleSheet.create({
    topNav: {
        width: '100%',
        flexDirection: "row",
        paddingVertical: 10
    },

});

export default Momo;




