import React, { useState } from 'react';
import { styled } from 'styled-components/native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { color } from '../../screens/color';

const { primary, sea, white, little, killed, grey } = color;
const InputField = styled.TextInput`
    font-size: 16px;
    color: ${killed};
    width: 80%;
    padding-left: 5px;
    padding-right: 25px;
    font-family: 'Manrope_600SemiBold';
`;

const InputContainer = styled.View`
    height: 50px;
    width: 100%;
    flex-direction: row;
    padding-horizontal: 10px;
    border-radius: 10px;
`;

const LeftIconContainer = styled.View`
    width: 10%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const LeftIcon = styled.View`
    position: absolute;
    z-index: 1;
`;

const RightIconContainer = styled.View`
    width: 10%;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const RightIcon = styled.TouchableOpacity`
    position: absolute;
    z-index: 1;
`;




const StyledTextInput = ({ icon,  isPhone, thisIsEmail, isPassword, isMat, valid, ...props }) => {

    const [inputBackgroundColor, setInputBackgroundColor] = useState(primary);
    const [hidePassword, setHidePassword] = useState(true);
    const [textChanged, setTextChanged] = useState(false)

    const customOnBlur = () => {
        props?.onBlur;
        setInputBackgroundColor(little);
    };

    const customOnFocus = () => {
        props?.onFocus;
        setInputBackgroundColor(killed);
    };

    return (
        <InputContainer style={{ borderWidth: 1.5, borderColor: textChanged ? valid ? 'green' : "#FA5F55" : "#DCDCDC", backgroundColor: "#FAFAFA" }}>
            <LeftIconContainer>
                <LeftIcon>
                <MaterialCommunityIcons name={icon} size={20} color="grey" />
                </LeftIcon>
                {isMat && <LeftIcon>
                </LeftIcon>
                }
            </LeftIconContainer>
            <InputField
                {...props}
                placeholderTextColor={killed}
                style={{ borderColor: inputBackgroundColor, ...props?.style }}
                onBlur={customOnBlur}
                onFocus={customOnFocus}
                secureTextEntry={isPassword && hidePassword}
                onChange={(text) => {
                    setTextChanged(true)
                }}
            />
            {isPassword && <RightIconContainer >

                <RightIcon onPress={() => { setHidePassword(!hidePassword) }}>
                    <Feather name={hidePassword ? 'eye-off' : 'eye'} size={20} color="#7A7A7A" />
                </RightIcon>

            </RightIconContainer>

            }



            {isPhone && <RightIcon>
                <Feather name={'chevron-down'} size={18} color="#7A7A7A" />

            </RightIcon>}

        </InputContainer>
    )

};

export default StyledTextInput;