import React from 'react';
import { styled } from 'styled-components/native';
import { color } from '../../screens/color';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
const { smallTextColor, newGrey } = color;


const StyledText = styled.Text`
    font-size: 12px;
    color: ${smallTextColor};
    text-align: left;
    font-family: 'Manrope_500Medium';    
`;


const SmallTexts = (props) => {

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

export default SmallTexts;