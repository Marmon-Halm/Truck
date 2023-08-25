import React from 'react';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
    useFonts,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold
} from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';


export default function UserPin(params) {
    const navigation = params.navigation;
    let [fontsLoaded] = useFonts({
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold
    });


    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>


            <StatusBar style="dark" />
        </View>
    );
}

const styles = StyleSheet.create({

});
