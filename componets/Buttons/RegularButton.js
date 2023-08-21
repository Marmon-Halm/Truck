import React from 'react';
import { styled } from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { View } from 'react-native';
import { color } from '../../screens/color';
import ButtonTexts from '../Texts/ButtonTexts';
const { white, killed, newGrey, disabledGrey } = color;



const ButtonView = styled.TouchableOpacity`
    height: 52px;
    padding: 15px;
    background-color: ${killed};
    width: 100%;
    justify-content: center;
    border-radius: 12px;
    text-align: center;
    align-items: center;

`;



const RegularButton = (props, isButton) => {
    return (

        <View>
            <ButtonView style={{ width: '100%' }} onPress={props.onPress} disabled={props.disabled} {...props}><ButtonTexts style={[{ ...props?.textStyle }]}>{props.children}</ButtonTexts></ButtonView>
        </View>
    )
};

export default RegularButton;