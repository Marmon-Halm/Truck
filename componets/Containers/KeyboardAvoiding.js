import React from 'react';
import { KeyboardAvoidingView, ScrollView, Keyboard, Pressable, Platform } from 'react-native';


const KeyboardAvoiding = (props) => {
    return ( 
    <KeyboardAvoidingView 
    style={{flex: 1, backgroundColor: 'transparent'}} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}   
    keyboardVerticalOffset={60}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={Keyboard.dismiss}>{props.children}</Pressable>
        </ScrollView>
    </KeyboardAvoidingView>)

};

export default KeyboardAvoiding;