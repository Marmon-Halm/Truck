import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View, Image, StyleSheet, Alert } from 'react-native';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from '@expo-google-fonts/manrope';
import AppLoading from 'expo-app-loading';
import MainContainer from '../componets/Containers/MainContainer';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import RegularTexts from '../componets/Texts/RegularTexts';
import MsgText from '../componets/Texts/MsgText';
import RegularButton from '../componets/Buttons/RegularButton';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { auth } from '../config';
import { Formik } from 'formik';
import { color } from '../screens/color';
import ghana from '../assets/ghana.png';
import app from '../config';
import { UserContext } from '../contexts/UserContext';
import { StatusBarHeight } from '../componets/shared';
import StyledInput from '../componets/Inputs/StyledInput';
const { primary, sea, white, little, killed, grey } = color;
import { MaterialIndicator } from 'react-native-indicators';
import ToastrSuccess from '../componets/Toastr Notification/ToastrSuccess';
import ToastrError from '../componets/Toastr Notification/ToastrError';


const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default function Login(params) {
  const navigation = params.navigation;

  const { setUserLoggedIn } = useContext(UserContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false)
  const [pwdValid, setPwdValid] = useState(false)
  const [loading, setLoading] = useState('');
  const [enableContinueBtn, setEnableContinueBtn] = useState(false);
  const [message, setMessage] = useState('');
  const [message1, setMessage1] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  //TOASTR
  const [toastrVisible, setToastrVisible] = useState(false);
  const [toastrVisible1, setToastrVisible1] = useState(false);
  const [bodyText, setBodyText] = useState('');
  const [bodyText1, setBodyText1] = useState('');

  const showToastr = (bodyText) => {
    setBodyText(bodyText);
  }
  const showToastr2 = (bodyText1) => {
    setBodyText1(bodyText1);
  }

  const successToastr = () => {
    setTimeout(() => {
      setToastrVisible(false);
    }, 4000)
    setToastrVisible(true);
    return showToastr('Email Verification Link Sent!');
  };

  const errorToastr = () => {
    setTimeout(() => {
      setToastrVisible1(false);
    }, 5000)

    setToastrVisible1(true);
    return showToastr2('Check your email to verify your account before proceeding.')
  }


  const handleLogin = () => {
    setSubmitting(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        
        const user = userCredential.user;
        if (user.emailVerified) {
          setUserLoggedIn(true);
          console.log('Signed In')
          console.log(user)

        } else {
          errorToastr();
          setLoading(false);
          setSubmitting(false);
        }
        
      })
      .catch((error) => {
        // setMessage('Login failed: ' + error.message);
        console.log(error.message)
        if (error.message === "Firebase: Error (auth/invalid-email)." || error.message === "Firebase: Error (auth/user-not-found)." || error.message === "Firebase: Error (auth/wrong-password).") {
          setErrorMessage('Incorrect Email Address or Password')
        }
        setLoading(false)
        setSubmitting(false)
      });
  };

  

  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });


  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return <MainContainer style={{ paddingTop: StatusBarHeight }}>
    <KeyboardAvoiding>

      <View style={{ width: 100, height: 100, alignSelf: 'center', marginVertical: 30 }}>
        <Image source={ghana} style={{ width: '100%', height: '100%' }} />
      </View>


      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          if (email === "" && password === "") {
            setMessage('Enter a valid email address');
            setMessage1('Enter a valid password');
            setSubmitting(false);

          } else if (email === "") {
            setMessage('Enter a valid email address');
            setSubmitting(false);

          } else if (password === "") {
            setMessage1('Enter a valid password');
            setSubmitting(false);
          } else {
            handleLogin(values, setSubmitting);
          }

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <>
            <MsgText
              style={{ marginBottom: 12, fontSize: errorMessage ? 16 : 0 }}
              success={isSuccessMessage}>
              {errorMessage || ""}
            </MsgText>

            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>Email Address</RegularTexts>
            <StyledInput
              icon="email-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              keyboardAppearance="light"
              onChangeText={(text) => {
                setEmail(text)
                setEmailValid(EMAIL_REGEX.test(text))
              }}
              value={email}
              valid={emailValid}
            />
            <MsgText
              style={{ marginBottom: message ? 12 : 5, marginLeft: 3, textAlign: 'left', }}
              success={isSuccessMessage}>
              {message || ""}
            </MsgText>


            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>Password</RegularTexts>
            <StyledInput
              icon="lock-outline"
              keyboardAppearance="light"
              onChangeText={(text) => {
                setPassword(text)
                setPwdValid(PWD_REGEX.test(text))
              }}
              isPassword={true}
              value={password}
              valid={pwdValid}
            />

            {/* <StyledTextInput
              icon="key"
              placeholder="Password"
              onChangeText={(text) => {
                setPassword(text)
                setPwdValid(PWD_REGEX.test(text))

              }}
              isPassword={true}
              value={password}
              valid={pwdValid}
            /> */}

            <MsgText
              style={{ marginBottom: message1 ? 12 : 0, marginLeft: 3, textAlign: 'left', fontSize: message1 ? 14 : 0 }}
              success={isSuccessMessage}>
              {message1 || ""}
            </MsgText>

            {!submitting && <RegularButton style={{ marginTop: 15, }} onPress={handleSubmit}>Login</RegularButton>}
            {submitting && (
              <RegularButton disabled={true} style={{ marginTop: 15, }}>
                <MaterialIndicator color='white' size={18} trackWidth={30 / 10} />
              </RegularButton>
            )}

            <RegularTexts style={{ textAlign: 'center', marginTop: 20, fontSize: 17 }}>Don't have an account? <RegularTexts style={{ color: primary, fontSize: 17 }} onPress={() => { navigation.navigate("SignUp") }} >Register</RegularTexts></RegularTexts>
            <RegularTexts style={{ textAlign: 'center', color: primary, marginTop: 5, fontSize: 17 }} onPress={() => { navigation.navigate('ResetP') }}>Forgot Password ?</RegularTexts>

          </>
        )}
      </Formik>

      {
        toastrVisible ? ( <ToastrSuccess
        bodyText={bodyText}
      />
      ) : null

      }

      {
        toastrVisible1 ? (  <ToastrError
          bodyText={bodyText1}
        />
      ) : null

      }

      

     

      <StatusBar style="dark" />

    </KeyboardAvoiding>
  </MainContainer>
}

const styles = StyleSheet.create({

  ImgContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    padding: 30,
  },
});
