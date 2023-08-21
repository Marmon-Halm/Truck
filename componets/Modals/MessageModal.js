import React from 'react';
import { styled } from 'styled-components/native';
import { Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { color } from '../../screens/color';
import BigTexts from '../Texts/BigTexts';
import RegularTexts from '../Texts/RegularTexts';
import RegularButton from '../Buttons/RegularButton';
import TitleText from '../Texts/TitleText';
const { white, killed, green, red } = color;



const ModalPressableContainer = styled.Pressable`
    flex: 1;
    padding: 25px;
    background-color: rgba(0, 0, 0, 0.7);
    align-items: center;
    justify-content: center;
`;

const ModalView = styled.View`
    background-color: ${white};
    border-radius: 20px;
    width: 100%;
    padding: 20px;
    elevation: 5;
    shadow-color: ${killed};
    shadow-offset: 0px 2px;
    shadow-opacity: 0.25;
    shadow-radius: 4px;
`;

const MessageModal = ({ modalVisible, buttonHandler, type, headerText, message, buttonText, }) => {

    return <Modal animationType='slide' visible={modalVisible} transparent={true}>
        <ModalPressableContainer onPress={buttonHandler}>
            <ModalView>
                <Feather
                    name={type === 'success' ? 'check-circle' : 'x-circle'} size={60}
                    color={type === 'success' ? green : "red"}
                    style={{ textAlign: 'center' }}
                />
                <TitleText style={{ fontSize: 28, marginVertical: 10, textAlign: 'center', color: "black"}}>{headerText}</TitleText>
                <RegularTexts style={{ textAlign: 'center', marginBottom: 20, fontSize: 16, color: "black"}}>{message}</RegularTexts>
                <RegularButton onPress={buttonHandler}>{buttonText || ""}</RegularButton>
            </ModalView>
        </ModalPressableContainer>
    </Modal>
};

export default MessageModal;