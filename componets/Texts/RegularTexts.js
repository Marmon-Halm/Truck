import React from 'react';
import { styled } from 'styled-components/native';
import { color } from '../../screens/color';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
const { killed, white } = color;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${killed};
    font-family: 'Manrope_600SemiBold';
    width: 100%;
`;


const RegularTexts = (props) => {
    let [fontsLoaded] = useFonts({
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold
      });
    
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return <StyledText {...props}>{ props.children }</StyledText>
};

export default RegularTexts;