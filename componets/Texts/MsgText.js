import React from 'react';
import { styled } from 'styled-components/native';
import { color } from '../../screens/color';
import { useFonts, Manrope_500Medium } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
const { red, sea } = color;

const StyledText = styled.Text`
    color: ${red};
    text-align: center;
    font-family: 'Manrope_500Medium';
`;


const MsgText = (props) => {
    let [fontsLoaded] = useFonts({
        Manrope_500Medium,
      });
    
    
      if (!fontsLoaded) {
        return <AppLoading />;
      }

    return <StyledText {...props}>{ props.children }</StyledText>
};

export default MsgText;