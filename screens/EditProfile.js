import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import MsgText from '../componets/Texts/MsgText';
import KeyboardAvoiding from '../componets/Containers/KeyboardAvoiding';
import BottomButton from '../componets/Buttons/BottomButton';
import RegularTexts from '../componets/Texts/RegularTexts';
import SmallTexts from '../componets/Texts/SmallTexts';
import { StatusBarHeight } from '../componets/shared';
import StyledInput from '../componets/Inputs/StyledInput';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useUser from '../hook/useUser';
import { setDoc, doc, uid } from '@firebase/firestore';
import { db } from '../config';



export default function EditProfile(params) {
    const navigation = params.navigation;
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [message, setMessage] = useState('');
    const [isSuccessMessage, setIsSuccessMessage] = useState(false);
    const [upload, setUpload] = useState(false);
    const [photoUri, setPhotoUri] = useState(null);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState(null);
    const { userData, isLoading: isUserDataLoading } = useUser();   

    useEffect(()=> {
        if(userData){
            // console.log('user data ', userData)
            setFirstName(userData.firstName);
            setPhoneNumber(userData.phoneNumber);
            setEmail(userData.email);
        }
    }, [userData, isUserDataLoading])

    const pickImage = async () => {
        setUpload(true);
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        setPhotoUri(result?.uri)

        console.log("&&&", photoUri);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const updateUserInfo = async () => {
       try {
        const userRef = doc(db, 'users', uid)
        setDoc(userRef, { photoUri: photoUri}, { merge: true});
        console.log("!UPDATING")
       } catch (error) {
        console.log("error resolving promise ", error);
      }
    };


    return (
        <View style={{ height: windowHeight, width: windowWidth, paddingTop: StatusBarHeight, backgroundColor: "#fff", paddingHorizontal: 20 }}>

            <View style={styles.view3}>
                <View style={{ width: "10%" }}>
                    <AntDesign name="arrowleft" size={26} style={{ textAlign: "left" }} color="black" onPress={() => {
                        navigation.goBack()
                    }} />
                </View>

                <View style={{ width: "80%" }}>
                    <Text style={styles.textProfile}>
                        Edit Profile
                    </Text>
                </View>
                <View style={{ width: "10%" }}>

                </View>

            </View>

            <KeyboardAvoiding>

                <View >
                    <View style={{ width: '100%', alignItems: 'center', marginBottom: 15, marginTop: 25 }}>
                        <TouchableOpacity style={{ width: 100, height: 100, borderRadius: 100 / 2, backgroundColor: '#E8E8E8', marginBottom: 12, borderWidth: 1, borderColor: 'grey' }} onPress={pickImage}>
                            <View style={{ width: upload ? 0 : '100%', height: upload ? 0 : '100%' , alignItems: 'center', justifyContent: 'center',}}>
                            <MaterialCommunityIcons name="image-plus" size={45} color="grey" />
                            </View>
                            {image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%', borderRadius: 100 / 2, }} />}
                        </TouchableOpacity>

                    </View>


                    <Formik
                        initialValues={{ firstName: '', email: '', phoneNumber: '', password: '' }}
                    // onSubmit={(values, { setSubmitting }) => {
                    //     if (values.username == "" || values.email == "" || values.phoneNumber == "" || values.password) {
                    //         setMessage('Please enter your details');
                    //         setSubmitting(false);
                    //     } else {
                    //         handleLogin(values, setSubmitting);
                    //     }
                    // }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                            <>
                                <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>Username</RegularTexts>
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

                                <RegularTexts style={{ marginBottom: 8, fontSize: 15, fontFamily: 'Manrope_600SemiBold' }}>Email Address</RegularTexts>
                                <StyledInput
                                    placeholder={userData.email}
                                    icon="email-outline"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    onChangeText={(text) => {
                                        setEmail(text)
                                    }}
                                    value={email}
                                    onBlur={handleBlur('email')}
                                    enablesReturnKeyAutomatically={true}
                                    keyboardAppearance="light"
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
                                    success={isSubmitting}>
                                    {message || ""}
                                </MsgText>
                            </>
                        )}
                    </Formik>
                </View>

                <StatusBar style="dark" />
            </KeyboardAvoiding>
            <BottomButton onPress={updateUserInfo}>Save Changes</BottomButton>
        </View>
    )
}

const styles = StyleSheet.create({


    view3: {
        width: '100%',
        flexDirection: "row",
        paddingVertical: 10
    },
    textProfile: {
        fontSize: 18,
        fontFamily: 'Manrope_600SemiBold',
        marginHorizontal: 10,
        textAlign: "center"
    },

});























