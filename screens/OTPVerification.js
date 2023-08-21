import React from 'react';
import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import StyledCodeInput from '../componets/Inputs/StyledCodeInput';
import RegularButton from '../componets/Buttons/RegularButton';
import MainContainer from '../componets/Containers/MainContainer';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import RegularTexts from '../componets/Texts/RegularTexts';
import { color } from '../screens/color';
import ResendTimer from '../componets/Timers/ResendTimer';
import MessageModal from '../componets/Modals/MessageModal';
const { primary, sea, white, little, killed, newGrey, grey } = color;


export default function OTPVerification(params) {
    const navigation = params.navigation;
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState('');
    const [pinReady, setpinReady] = useState(false);
    const [verifying, setVerifying] = useState(false);
    // resending email
    const [activeResend, setActiveResend] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');
    const [resendingEmail, setResendingEmail] = useState(false);
    // modal
    // modalVisible, buttonHandler, type, headerText, message, buttonText
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [buttonText, setButtonText] = useState('');

    const buttonHandler = () => {
        if (modalMessageType === "success") {
            // do something

        }

        setModalVisible(false);
    };
    const showModal = (type, headerText, message, buttonText) => {
        setModalMessageType(type);
        setHeaderText(headerText);
        setModalMessage(message);
        setButtonText(buttonText);
        setModalVisible(true);
    };
    const resendEmail = async (triggerTimer) => {
        try {
            setResendingEmail(true);

            // make request to backend
            // update  setResendStatus(); to 'Failed!' or 'Sent!'

            setResendingEmail(false);
            //hold on briefly
            setTimeout(() => {
                setResendStatus('Resend');
                setActiveResend(false);
                triggerTimer();
            }, 5000)


        } catch (error) {
            setResendStatus(false);
            setResendStatus('Failed');
            alert('Email Resend Failed: ' + error.message);

        }
    };
    const handleEmailVerification = async () => {
        try {
            setVerifying(true);

            // call backend

            setVerifying(false);
            return showModal('success', 'All Good!', 'Email Verified.', 'Proceed')

        } catch (error) {
            setVerifying(false);
            return showModal('failed', 'Failed!', error.message, 'Close')
        }
    };

    return <MainContainer>
        <AntDesign name="arrowleft" size={30} color="black" onPress={() => { navigation.goBack() }} />

        <KeyboardAvoiding>

            <RegularTexts style={{ textAlign: 'center', color: '#585656', marginTop: 20 }}>Type 4-digit code sent to your email</RegularTexts>

            <StyledCodeInput
                maxLength={MAX_CODE_LENGTH}
                setCode={setCode}
                code={code}
                setpinReady={setpinReady}
            />

            <ResendTimer
                activeResend={activeResend}
                setActiveResend={setActiveResend}
                resendStatus={resendStatus}
                resendingEmail={resendingEmail}
                resendEmail={{ resendEmail }}>
            </ResendTimer>

            <MessageModal
                modalVisible={modalVisible}
                buttonHandler={buttonHandler}
                type={modalMessageType}
                headerText={headerText}
                message={modalMessage}
                buttonText={buttonText}
            />

            {!verifying && pinReady && <RegularButton onPress={handleEmailVerification} style={{ marginTop: 20 }}>Verify</RegularButton>}
            {!verifying && !pinReady && <RegularButton disabled={true} style={{ marginTop: 20, backgroundColor: '#DCDCDC' }} textStyle={{ color: '#B6B6B4' }}>Verify</RegularButton>}

            {verifying && (
                <RegularButton disabled={true}>
                    <ActivityIndicator size="small" color={white} />
                </RegularButton>
            )}

            <StatusBar style="dark" />
        </KeyboardAvoiding>
    </MainContainer>
};


