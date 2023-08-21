import React from 'react';
import { styled } from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { View } from 'react-native';
import { color } from '../../screens/color';
import ButtonTexts from '../Texts/ButtonTexts';
const { white, killed, newGrey } = color;



const ButtonView = styled.TouchableOpacity`
    padding: 15px;
    background-color: transparent;
    width: 100%;
    border-width: 1.5px;
    border-radius: 10px;
    text-align: center;
`;

const FilledButton = (props) => {
    return (

        <View>
            <ButtonView style={{width: '100%'}} onPress={props.onPress}{...props}><ButtonTexts style={[{ color: '#BA2F2F' }]}>{props.children}</ButtonTexts></ButtonView>
        </View>
    )
};

export default FilledButton;