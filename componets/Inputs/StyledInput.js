import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { styled } from 'styled-components/native';
import master from '../../assets/master.png'
import visa from '../../assets/visa.png'
import mtn from '../../assets/mtn.jpg'
import voda from '../../assets/voda.png'
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { color } from '../../screens/color';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';




const { primary, sea, white, little, killed, grey } = color;




const InputField = styled.TextInput`
    font-size: 15px;
    color: ${killed};
    width: 80%;
    padding-left: 5px;
    padding-right: 25px;
    font-family: 'Manrope_500Medium';
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




const StyledInput = ({ icon, label, isPhone, thisIsEmail, isPassword, isCard, isMat, isMomo, isVoda, valid, ...props }) => {

    let [fontsLoaded] = useFonts({
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold
    });

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

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <InputContainer style={{ borderWidth: 2, borderColor: '#EDEDED', backgroundColor: "#FAFAFA" }}>
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
                    <Feather name={hidePassword ? 'eye-off' : 'eye'} size={18} color="#7A7A7A" />
                </RightIcon>

            </RightIconContainer>

            }

            {isCard && <RightIconContainer >

                <RightIcon >
                    <Image source={visa} style={{ width: 24, height: 22, borderRadius: 5 }} />
                </RightIcon>

            </RightIconContainer>

            }

            {isMomo && <RightIconContainer >

                <RightIcon>
                    <Image source={mtn} style={{ width: 24, height: 22, borderRadius: 5 }} />
                </RightIcon>

            </RightIconContainer>

            }

            {isVoda && <RightIconContainer >

                <RightIcon >
                    <Image source={voda} style={{ width: 24, height: 22, borderRadius: 5 }} />
                </RightIcon>

            </RightIconContainer>

            }



            {isPhone && <RightIcon>
                <Feather name={'chevron-down'} size={18} color="#7A7A7A" />

            </RightIcon>}

        </InputContainer>
    )

};

export default StyledInput;