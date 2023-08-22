import React from 'react';
import { styled } from 'styled-components/native';
import { color } from '../../screens/color';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
const { killed, white } = color;

const StyledText = styled.Text`
    font-size: 16px;
    color: ${killed};
    font-family: 'Manrope_600SemiBold';
    width: 100%;
`;


const RegularTexts = (props) => {
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
  return <StyledText {...props}>{props.children}</StyledText>
};

export default RegularTexts;