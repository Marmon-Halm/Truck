import React, { useState } from 'react';
import { View } from 'react-native';
import { styled }from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SmallTexts from '../Texts/SmallTexts';
import { Feather } from '@expo/vector-icons';
import { color } from '../../screens/color';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';




const { primary, sea, white, little, killed, grey } = color;




const InputField = styled.TextInput`
    font-size: 18px;
    height: 55px;
    margin-top: 3px;
    color: ${killed};
    padding: 15px;
    padding-left: 48px;
    padding-right: 55px;
    font-family: 'Manrope_500Medium';
    border-radius: 10px;
    background-color: ${grey};
`;

const LeftIcon = styled.View`
    position: absolute;
    top: 34px;
    left: 16px;
    z-index: 1;
`;

const RightIcon = styled.TouchableOpacity`
    position: absolute;
    top: 35px;
    right: 16px;
    z-index: 1;
`;




const StyledPickerInput = ({ icon, label, isPhone, isPassword, ...props }) => {

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

    const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);
    const [hidePassword, setHidePassword] = useState(true);

    const customOnBlur = () => {
        props?.onBlur;
        setInputBackgroundColor(little);
    };

    const customOnFocus = () => {
        props?.onFocus;
        setInputBackgroundColor(killed);
    };

    return (
        <View >
            <LeftIcon>
                <Feather name={icon} size={21} color="#7A7A7A" />
            </LeftIcon>
            <SmallTexts>{label}</SmallTexts>
            <InputField 
                {...props}
                placeholderTextColor={killed}
                style={{ borderColor: inputBackgroundColor, ...props?.style }}
                onBlur={customOnBlur}
                onFocus={customOnFocus}
                secureTextEntry={isPassword && hidePassword}
            />
            {isPassword && <RightIcon onPress={() => {
                setHidePassword(!hidePassword);
            }}>
                <Feather name={hidePassword ? 'eye-off' : 'eye'} size={18} color="#7A7A7A" />
                
                </RightIcon>}

            {isPhone && <RightIcon>
                <Feather name={'chevron-down'} size={18} color="#7A7A7A" />
                
                </RightIcon>}

        </View>
    )

};

export default StyledPickerInput;