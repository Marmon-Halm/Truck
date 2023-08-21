import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
import { firebase, firebaseConfig } from '../config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import MainContainer from '../componets/Containers/MainContainer';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import RegularTexts from '../componets/Texts/RegularTexts';
import StyledTextInput from '../componets/Inputs/StyledTextInput';
import MsgText from '../componets/Texts/MsgText';
import RegularButton from '../componets/Buttons/RegularButton';
import { Formik } from 'formik';
import { color } from '../screens/color';
import PressableText from '../componets/Texts/PressableText';
const { primary, sea, white, little, killed, grey } = color;




export default function EmailVerification(params) {
  const navigation = params.navigation;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [password, setPassword] = useState('');


  const [message, setMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleLogin = async (credentials, setSubmitting) => {
    try {
      setMessage(null);

      // call backend

      //move to next page

      setSubmitting(false);

    } catch (error) {
      setMessage('Login failed: ' + error.message);
      setSubmitting(false)
    }
  };

  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <MainContainer>
    <KeyboardAvoiding>


      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          if (values.email == "" || values.password == "") {
            setMessage('Please enter your details');
            setSubmitting(false);
          } else {
            handleLogin(values, setSubmitting);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <>
            <StyledTextInput
              icon="mail"
              placeholder="Email Address"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />

            <StyledTextInput
              icon="key"
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              isPassword={true}
              value={values.password}
            />

            <PressableText style={{ textAlign: 'right', marginVertical: 10 }}>Forgot Password ?</PressableText>

            <MsgText
              style={{ marginBottom: 20 }}
              success={isSuccessMessage}>
              {message || ""}
            </MsgText>

            {!isSubmitting && <RegularButton onPress={handleSubmit}>Login</RegularButton>}
            {isSubmitting && (
              <RegularButton disabled={true}>
                <ActivityIndicator size="small" color={white} />
              </RegularButton>
            )}


            <RegularTexts style={{ textAlign: 'center', marginTop: 20 }}>Don't have an account? <RegularTexts style={{ color: primary }}>Sign Up</RegularTexts></RegularTexts>
          </>
        )}
      </Formik>

      <StatusBar style="dark" />

    </KeyboardAvoiding>
  </MainContainer>
  

}

