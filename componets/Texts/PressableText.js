import React from 'react';
import { styled } from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { color } from '../../screens/color';
import RegularTexts from './RegularTexts';
const { primary } = color;



const StyledPressable = styled.Pressable`
    padding-vertical: 0px;
    color: ${primary};
`;


const PressableText = (props) => {
    return (
        <StyledPressable onPress={props.onPress}{...props}>
            <RegularTexts>{props.children}</RegularTexts>
        </StyledPressable>
    )
};

export default PressableText;