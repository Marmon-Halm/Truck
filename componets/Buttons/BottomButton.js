import React from 'react';
import { styled } from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { View } from 'react-native';
import { color } from '../../screens/color';
import ButtonTexts from '../Texts/ButtonTexts';
const { white, killed, newGrey } = color;



const ButtonView = styled.TouchableOpacity`
    height: 52px;
    padding: 15px;
    background-color: ${killed};
    border-radius: 12px;
    text-align: center;
    position: absolute;
    bottom: 35px;
`;



const BottomButton = (props) => {
    return (

        <View>
            <ButtonView style={{ width: '100%' }} onPress={props.onPress}{...props}><ButtonTexts style={[{ ...props?.textStyle }]}>{props.children}</ButtonTexts></ButtonView>
        </View>
    )
};

export default BottomButton;