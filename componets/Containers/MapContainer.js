import React from 'react';
import { styled } from 'styled-components/native';
import { StatusBarHeight } from '../shared';



const StyledView = styled.View`
    flex: 1;
    padding-top: 44px;
`;


const MapContainer = (props) => {
    return   <StyledView {...props}>{ props.children }</StyledView>
};

export default MapContainer;