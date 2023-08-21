import React, { useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components/native';
import { StatusBarHeight } from '../shared';
import { color } from '../../screens/color';
const { white, newGrey, killed, primary, backgrey} = color;
import { useFonts,  Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';



const CodeInputSection = styled.View`
    flex: 1;
    align-items: center;
    justify-contents: center;
    margin-vertical: 35px;
`;

const HiddenTextInput = styled.TextInput`
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
`;

const CodeInputContainer = styled.Pressable`
    width: 80%;
    flex-direction: row;
    justify-content: space-between;

`;

const CodeInput = styled.View`
    min-width: 17%;
    padding: 12px;
    border-bottom-width: 4px;
    background-color: ${backgrey};
    border-radius: 10px;
    border-color: ${newGrey};
`;

const CodeInputFocused = styled(CodeInput)`
    border-color: ${primary};
`;

const CodeInputText = styled.Text`
    font-size: 28px;
    text-align: center;
    font-family: 'Manrope_600SemiBold';
    color: ${killed};
`;




const StyledCodeInput = ({ code, setCode, maxLength, setpinReady }) => {

    let [fontsLoaded] = useFonts({
        Manrope_600SemiBold,
    });



    // ref for text input
    const codeDigitArray = new Array(maxLength).fill(0);

    const [inputContainerIsFocused, setInputContainerIsFocused] = useState(false);

    const textInputRef = useRef(null);

    const handleOnPress = () => {
        setInputContainerIsFocused(true);
        textInputRef?.current?.focus();
    };

    const handleOnSubmitEditting = () => {
        setInputContainerIsFocused(false);
    };

    useEffect(() => {
        //toggle pin ready
        setpinReady(code.length === maxLength);
        return () => setpinReady(false);
    }, [code]);


    const toCodeDigitInput = (value, index)=> {
        const emptyInputChar = ' ';
        const digit = code[index] || emptyInputChar;

        //formatting
        const isCurrentDigit = index == code.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit  &&  isCodeFull);

        const StyledCodeInput = inputContainerIsFocused && isDigitFocused ? CodeInputFocused : CodeInput;

        return (
            <StyledCodeInput key={index}>
                <CodeInputText>{digit}</CodeInputText>
            </StyledCodeInput>
        )
    };

    

    if (!fontsLoaded) {
        return <AppLoading />;
    };

   
    return <CodeInputSection>
        <CodeInputContainer onPress={handleOnPress}>{codeDigitArray.map(toCodeDigitInput)}</CodeInputContainer>
        <HiddenTextInput
            keyboardType='number-pad'
            returnKeyType='done'
            textContentType='oneTimeCode'
            ref={textInputRef}
            value={code}
            maxLength={maxLength}
            onChangeText={setCode}
            onSubmitEditing={handleOnSubmitEditting}
        />
    </CodeInputSection>
};

export default StyledCodeInput;