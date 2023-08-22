import React from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const ToastrForSignUp = ({ bodyText }) => {
    const [fontsLoaded] = useFonts({
        'Manrope_500Medium': require('../../assets/Manrope-Medium.ttf'),
        'Manrope_600SemiBold': require('../../assets/Manrope-SemiBold.ttf'),
        'Manrope_700Bold': require('../../assets/Manrope-Bold.ttf'),
    })

    if (!fontsLoaded) {
        return undefined;
    } else {
        SplashScreen.hideAsync();
    }
    
    return (
        <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={{
                position: 'absolute',
                top: 50,
                left: 20,
                // top: Constants.statusBarHeight,
                backgroundColor: '#FA5F55',
                width: '100%',
                borderRadius: 7,
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                shadowColor: '#003049',
                shadowOpacity: 0.4,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
            }}

        >
            <MaterialCommunityIcons
                name="cancel"
                size={25}
                color="black" />
            <View style={{ marginLeft: 12 }}>
                <Text style={{ color: 'black', fontSize: 15, fontFamily: 'Manrope_700Bold' }}>Error</Text>
                <Text style={{ color: 'black', fontSize: 14, fontFamily: 'Manrope_500Medium' }}>{bodyText}</Text>
            </View>
        </Animated.View>
    )
}

export default ToastrForSignUp;