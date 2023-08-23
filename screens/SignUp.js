import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from "react";
import { StyleSheet, View, Image, ActivityIndicator, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import 'react-native-gesture-handler';
import ghana from '../assets/ghana.png'
import { AntDesign } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import RNPickerSelect from 'react-native-picker-select';
import MainContainer from '../componets/Containers/MainContainer';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import RegularTexts from '../componets/Texts/RegularTexts';
import MsgText from '../componets/Texts/MsgText';
import RegularButton from '../componets/Buttons/RegularButton';
import { Formik } from 'formik';
import { color } from '../screens/color';
import TitleText from '../componets/Texts/TitleText';
import SmallTexts from '../componets/Texts/SmallTexts';
import RowContainer from '../componets/Containers/RowContainer';
import { sendEmailVerification } from 'firebase/auth';
import { auth, db } from '../config';
const { primary } = color;
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where, setDoc, doc } from 'firebase/firestore';
import { StatusBarHeight } from '../componets/shared';
import MessageModal from '../componets/Modals/MessageModal';
import { MaterialIndicator } from 'react-native-indicators';
import StyledInput from '../componets/Inputs/StyledInput';
import BottomButton from '../componets/Buttons/BottomButton';
import ToastrSuccess from '../componets/Toastr Notification/ToastrSuccess';
import ToastrForSignUp from '../componets/Toastr Notification/ToastForSignUp';
import StyledTextInput from '../componets/Inputs/StyledTextInput';
// import { firebase } from '../config';







export default function SignUp(params) {

  const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [checked, toggleChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [country, setCountry] = useState('');
  const [emailValid, setEmailValid] = useState(false)
  const [pwdValid, setPwdValid] = useState(false)
  const [loading, setLoading] = useState('');
  const [message, setMessage] = useState('');
  const [checkboxEnabled, setCheckboxEnabled] = useState(false);

  //MODAL TEXT
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessageType, setModalMessageType] = useState('');
  const [headerText, setHeaderText] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [buttonText, setButtonText] = useState('');

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

  const checkButtonAndEnableSignUp = () => {
    toggleChecked(!checked);
  };

  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const handleRegister = async () => {
    setLoading(true)

    try {
      console.log('registering...')
      setMessage(null);

      // call backend
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const user = response.user;


      setLoading(false);
      // showModal('success', 'Great!', 'Verification Email Sent', 'Close');

      // Create a new user
      await sendEmailVerification(user);

      try {
        await setDoc(doc(db, "users", user?.uid), {
          uid: user?.uid,
          country: country,
          firstName: firstName,
          email: email,
          phoneNumber: phoneNumber,
        })
          .then((res) => {
            successToastr();
            setLoading(false);

            setTimeout(() => {
              navigation.navigate('Login')
            }, 3000)

          });


      } catch (error) {
        setLoading(false);
        console.log(error);
        return; // Exit early if there was an error adding the user data
      }

      setSubmitting(false);

    } catch (error) {
      console.log(error)
      setLoading(false)
      setSubmitting(false)
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        // return showModal('fail', 'Registration Failed!', 'Email Address Already In Use', 'Close');
        setTimeout(() => {
          setToastrVisible1(false);
        }, 5000)

        setToastrVisible1(true);
        return showToastr2('Email Address Already In Use.')
      } else {
        // return showModal('fail', 'Registration Failed!', error.message, 'Close');
        setTimeout(() => {
          setToastrVisible1(false);
        }, 5000)

        setToastrVisible1(true);
        return showToastr2(error.message)
      }
    }
  };


  const navigation = params.navigation;

  // FONTS
 



  return <MainContainer style={{ paddingTop: StatusBarHeight }}>
    <AntDesign name="arrowleft" size={30} color="black" onPress={() => { navigation.goBack() }} />
    <KeyboardAvoiding>



      <TitleText style={{ marginBottom: 15, marginTop: 7, }}>Register here, it's free!</TitleText>

      <RegularTexts>Country</RegularTexts>

      <View style={styles.pickerView}>

        <View style={{ width: 22, height: 22, }}>
          <Image source={ghana} style={{ width: '100%', height: '100%' }} />
        </View>

        <View style={{ width: '80%' }} >
          <RNPickerSelect

            style={{
              ...pickerSelectStyles,
              placeholder: {
                color: 'black'
              },
            }}
            placeholder={{
              label: "Ghana",
              value: 'Ghana',
              color: 'black',

            }}
            placeholderTextColor={'black'}
            onValueChange={(value) => setCountry(value)}
            items={[
              { label: 'Nigeria', value: 'Nigeria' },
            ]}

          />
        </View>


      </View>





      <Formik
        initialValues={{ firstName: '', email: '', phoneNumber: '', password: '' }}
        onSubmit={(values, { setSubmitting }) => {
          if (firstName === "" || email === "" || phoneNumber === "" || password === "") {
            setMessage('Please enter your details');
            console.log('first name ', firstName)
            console.log('phone ', phoneNumber)
            console.log('email ', email)
            console.log('pass ', password)


            setSubmitting(false);
          } else {
            handleRegister()
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting, }) => (
          <>

            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>First Name</RegularTexts>
            <StyledInput
              icon="account-outline"
              onChangeText={(text) => setFirstName(text)}
              onBlur={handleBlur('firstName')}
              enablesReturnKeyAutomatically={true}
              keyboardAppearance="light"
              value={firstName}
            />
            <MsgText
              style={{ marginBottom: message ? 12 : 5, marginLeft: 3, textAlign: 'left', }}
              success={isSuccessMessage}>
              {message || ""}
            </MsgText>

            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>Phone Number</RegularTexts>
            <StyledInput
              icon="phone-outline"
              keyboardType="numeric"
              keyboardAppearance="light"
              inputMode='numeric'
              returnKeyType='done'
              onChangeText={(text) => setPhoneNumber(text)}
              value={phoneNumber}
              minLength={1}
              maxLength={10}
            />
            <MsgText
              style={{ marginBottom: message ? 12 : 5, marginLeft: 3, textAlign: 'left', }}
              success={isSuccessMessage}>
              {message || ""}
            </MsgText>

            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>Email Address</RegularTexts>
            <StyledInput
              icon="email-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text)
                setEmailValid(EMAIL_REGEX.test(text))
              }}
              value={email}
              valid={emailValid}
              onBlur={handleBlur('email')}
              enablesReturnKeyAutomatically={true}
              keyboardAppearance="light"
            />
            <MsgText
              style={{ marginBottom: message ? 12 : 5, marginLeft: 3, textAlign: 'left', }}
              success={isSuccessMessage}>
              {message || ""}
            </MsgText>

            <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>Password</RegularTexts>
            <StyledTextInput
              icon="lock-outline"
              onChangeText={(text) => {
                setPassword(text)
                setPwdValid(PWD_REGEX.test(text))
                setCheckboxEnabled(true)
              }}
              isPassword={true}
              value={password}
              valid={pwdValid}
              onBlur={handleBlur('password')}
              keyboardAppearance="light"
            />

            <SmallTexts style={{ marginTop: 5, marginLeft: 3, marginBottom: 40 }}>Password must have a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</SmallTexts>

          </>
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

    <RowContainer style={{ position: 'absolute', bottom: 100, left: 20, right: 20 }}>
      <View style={{ marginRight: 8 }}>
        <Checkbox
          value={checked}
          onValueChange={checkButtonAndEnableSignUp}
          disabled={!pwdValid}
          onPress={checkButtonAndEnableSignUp}
          color={checked ? '#000' : undefined}
        />
      </View>
      <RegularTexts style={{ fontSize: 13 }}>By submitting this form, you accept NAME's <RegularTexts style={{ color: primary, fontSize: 13 }}>Terms and Conditions</RegularTexts> and <RegularTexts style={{ color: primary, fontSize: 13 }}>Privacy Policy</RegularTexts></RegularTexts>

    </RowContainer>

    {!loading && <BottomButton onPress={handleRegister} disabled={!checked} style={{ opacity: checked ? 1 : 0.3, width: '100%' }}>Register</BottomButton>}
    {loading && (
      <BottomButton disabled={loading} style={{ opacity: 0.8, alignItems: 'center', width: '100%' }}>
        <MaterialIndicator color='white' size={18} trackWidth={30 / 10} />
      </BottomButton>
    )}

    {
      toastrVisible ? (<ToastrSuccess
        bodyText={bodyText}
      />
      ) : null

    }

    {
      toastrVisible1 ? (<ToastrForSignUp
        bodyText={bodyText1}
      />
      ) : null

    }


  </MainContainer>
}





const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 22,
    height: '100%',
    width: "100%",
  },

  view3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0,
    alignItems: 'center'
  },
  pickerView: {
    fontSize: 17,
    flexDirection: 'row',
    fontFamily: 'Manrope_500Medium',
    height: 50,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 15,
    color: '#0000',
    paddingLeft: 15,
    paddingRight: 55,
    borderRadius: 10,
    backgroundColor: "#FAFAFA",
    borderWidth: 1.5,
    borderColor: '#DCDCDC'
  },
  checkboxContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '7%',
  },
});



const pickerSelectStyles = StyleSheet.create({
  inputIOS: {

    backgroundColor: 'transparent',
    fontFamily: 'Manrope_500Medium',
    paddingLeft: 10,
    fontSize: 15,
    color: `#000`,
    width: '100%',
  },
});













{/* <>

<MsgText
  style={{ marginBottom: 5 }}
  success={isSuccessMessage}>
  {message || ""}
</MsgText>
<StyledTextInput
  icon="user"
  placeholder="First Name"
  onChangeText={(text) => setFirstName(text)}
  onBlur={handleBlur('firstName')}
  enablesReturnKeyAutomatically={true}
  keyboardAppearance="light"
  value={firstName}
/>
<MsgText
  style={{}}
  success={isSuccessMessage}>
  {""}
</MsgText>

<StyledTextInput
  icon="phone"
  placeholder="Phone Number"
  keyboardType="numeric"
  keyboardAppearance="light"
  inputMode='numeric'
  returnKeyType='done'
  onChangeText={(text) => setPhoneNumber(text)}
  value={phoneNumber}
  minLength={1}
  maxLength={10}
/>
<MsgText success={isSuccessMessage}> {""} </MsgText>

<StyledTextInput
  icon="mail"
  placeholder="Email Address"
  keyboardType="email-address"
  autoCapitalize="none"
  onChangeText={(text) => {
    setEmail(text)
    setEmailValid(EMAIL_REGEX.test(text))
  }}
  value={email}
  valid={emailValid}
  onBlur={handleBlur('email')}
  enablesReturnKeyAutomatically={true}
  keyboardAppearance="light"
/>
<MsgText success={isSuccessMessage}> {""} </MsgText>

<StyledTextInput
  icon="key"
  placeholder="Password"
  onChangeText={(text) => {
    setPassword(text)
    setPwdValid(PWD_REGEX.test(text))
    setCheckboxEnabled(true)

  }}
  isPassword={true}
  value={password}
  valid={pwdValid}
  onBlur={handleBlur('password')}
  keyboardAppearance="light"
/>

<SmallTexts style={{ marginTop: 5, marginLeft: 3, marginBottom: 40 }}>Password must have a minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character</SmallTexts>




<RowContainer style={{ marginBottom: 15 }}>
  <View style={{ marginRight: 8 }}>
    <Checkbox
      value={checked}
      onValueChange={checkButtonAndEnableSignUp}
      disabled={!pwdValid}
      onPress={checkButtonAndEnableSignUp}
      color={checked ? '#000' : undefined}
    />
  </View>
  <RegularTexts style={{ fontSize: 13 }}>By submitting this form, you accept NAME's <RegularTexts style={{ color: primary, fontSize: 13 }}>Terms and Conditions</RegularTexts> and <RegularTexts style={{ color: primary, fontSize: 13 }}>Privacy Policy</RegularTexts></RegularTexts>

</RowContainer>

{!loading && <RegularButton onPress={handleSubmit} disabled={!checked} style={{ opacity: checked ? 1 : 0.3 }}>Register</RegularButton>}
{loading && (
  <RegularButton disabled={loading} style={{ alignItems: 'center' }}>
    <MaterialIndicator color='white' size={18} trackWidth={30 / 10} />
  </RegularButton>
)}


</> */}


// const timestamp = firebase.firestore.FieldValue.serverTimestamp();
// const data = {
//   uid: user?.uid,
//   country: country,
//   firstName: firstName,
//   email: email,
//   phoneNumber: phoneNumber,
//   createdAt: timestamp
// };
// todoRef
//   .add(data)
//   .then(() => {
//     setAddData('');

//   })
//   .catch((error) => {
//     alert(error)
//   })