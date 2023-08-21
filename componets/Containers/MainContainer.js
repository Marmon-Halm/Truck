import React from 'react';
import { StatusBar } from 'react-native';
import { styled } from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { color } from '../../screens/color';
const { white } = color;



const StyledView = styled.View`
    flex: 1;
    padding-top: ${StatusBarHeight} px;
    paddingHorizontal: 22px;
    background-color: ${white};
`;


const MainContainer = (props) => {
    return   <StyledView {...props}>{ props.children }</StyledView>
};

export default MainContainer;