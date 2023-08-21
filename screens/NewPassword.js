import React from 'react';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
import MainContainer from '../componets/Containers/MainContainer';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import RegularTexts from '../componets/Texts/RegularTexts';
import StyledTextInput from '../componets/Inputs/StyledTextInput';
import MsgText from '../componets/Texts/MsgText';
import RegularButton from '../componets/Buttons/RegularButton';
import { Formik } from 'formik';
import { color } from './color';
import { styled }from 'styled-components/native';
import BigTexts from '../componets/Texts/BigTexts';
import StyledCodeInput from '../componets/Inputs/StyledCodeInput';
import MessageModal from '../componets/Modals/MessageModal';
import ResendTimer from '../componets/Timers/ResendTimer';
import { StatusBarHeight } from '../componets/shared';
import StyledInput from '../componets/Inputs/StyledInput';
import TitleText from '../componets/Texts/TitleText';
const { primary, sea, white, little, killed, backgrey } = color;





export default function NewPassword(params) {
    const [checked, toggleChecked] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const MAX_CODE_LENGTH = 4;
    const [code, setCode] = useState('');
    const [pinReady, setpinReady] = useState(false);
    const [activeResend, setActiveResend] = useState(false);
    const [resendStatus, setResendStatus] = useState('Resend');
    const [resendingEmail, setResendingEmail] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessageType, setModalMessageType] = useState('');
    const [headerText, setHeaderText] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [buttonText, setButtonText] = useState('');

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

    const FormWrapper = styled.View`
        ${(props) => {
           return props.pinReady ? `opacity: 1` : `opacity: 0.3`
        }}
    `;

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
    const navigation = params.navigation;


    const handleOnSubmit = async (credentials, setSubmitting) => {
        try {
            setMessage(null);

            // call backend


            setSubmitting(false);
            return showModal('success', 'All Good!', 'Password Reset', 'Close')

        } catch (error) {
            setMessage('Request failed: ' + error.message);
            setSubmitting(false)
            return showModal('failed', 'Failed!', error.message, 'Close')
        }
    };

    



    return <MainContainer style={{paddingTop: StatusBarHeight}}>
        <AntDesign name="arrowleft" size={30} color="black" onPress={() => { navigation.goBack() }} />
        <KeyboardAvoiding>

            <TitleText style={{ marginBottom: 20, marginTop: 10 }}>Reset Password</TitleText>
            <RegularTexts style={{ color: '#6A6A6A'}}>Enter verification code and reset password</RegularTexts>


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

            <Formik
                initialValues={{ newPassword: '', confirmPassword: '' }}
                onSubmit={(values, { setSubmitting }) => {
                    if (values.newPassword == "" || values.confirmPassword == "") {
                        setMessage('Please enter your details');
                        setSubmitting(false);
                    } else if (values.newPassword !== values.confirmPassword){
                        setMessage('Passwords do not match');
                        setSubmitting(false);
                    } else {
                        handleOnSubmit(values, setSubmitting);
                    }
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                    <FormWrapper pinReady={pinReady}>
                        <StyledInput
                            icon="key"
                            placeholder="New Password"
                            onChangeText={handleChange('newPassword')}
                            onBlur={handleBlur('newPassword')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            isPassword={true}
                            minLength={8}
                            keyboardAppearance="light"
                            value={values.newPassword}
                            editable={pinReady}
                        />

                        <StyledInput
                            icon="key"
                            placeholder="Confirm Password"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            isPassword={true}
                            minLength={8}
                            keyboardAppearance="light"
                            value={values.confirmPassword}
                            editable={pinReady}
                        />

                        <MsgText
                            style={{ marginBottom: 20 }}
                            success={isSuccessMessage}>
                            {message || ""}
                        </MsgText>

                        {!isSubmitting && <RegularButton disabled={!pinReady} onPress={handleSubmit}>Reset</RegularButton>}
                        {isSubmitting && (
                            <RegularButton style={{ alignItems: 'center' }} disabled={true}>
                                <ActivityIndicator size="small" color={white} />
                            </RegularButton>
                        )}
                    </FormWrapper>
                )}
            </Formik>

            <MessageModal
                modalVisible={modalVisible}
                buttonHandler={buttonHandler}
                type={modalMessageType}
                headerText={headerText}
                message={modalMessage}
                buttonText={buttonText}
            />

            <StatusBar style="dark" />
        </KeyboardAvoiding>
    </MainContainer>
}





