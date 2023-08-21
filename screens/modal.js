import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_700Bold, Manrope_600SemiBold, } from '@expo-google-fonts/manrope';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import Modal from "react-native-modal";




export default function Home(params) {
  const navigation = params.navigation;
  let [fontsLoaded] = useFonts({
    
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  


  return (
    <View style={styles.container}>


<View style={{ padding: 25, marginTop: 60 }}>
                <View style={{marginTop:50}}>
                  <Text style={{ marginBottom: 10, fontSize: 34, fontFamily: 'Manrope_700Bold', color: `#383838`, fontWeight:'900'  }}>Transfer. </Text>
                </View>
                <View>
                <View style={styles.optionsContainer}>
                  <Image style={styles.flag} source={require('../assets/GB.png')}/>
                  <Text style={styles.unnecessary}> GBP    ⇄  GHS        0.91{"\n"}
                     1 GBP     9.77GHS    0.91</Text>
                  
                </View>
                <View style={styles.optionsContainer}>
                <Image style={styles.flag} source={require('../assets/usa.png')}/>
                <Text style={styles.unnecessary}> USD    ⇄  GHS        0.91{"\n"}
                     1 USD     7.80GHS    0.91</Text>
                </View>
                </View>
               
              
</View>
            <View style={{marginTop: 20}}>
                
                </View>
                <View style={{alignItems: 'center', paddingBottom: 400,backgroundColor: "#006E90", borderTopRightRadius: 255}}>
                <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Home") }}>
                    <Text style={styles.buttonText} >Send Money</Text>
                </TouchableOpacity>
                </View>

      <View style={styles.iconView}>


        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          
          <Ionicons
            name="home-outline"
            size={28}
            color="#016e96"
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
          <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 12, color: "#016e96"}}>
            Home
          </Text>
        </View>


        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <AntDesign name="bars" size={28} color="black" />
          <Text style={styles.iconViewText}>Transaction</Text>
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Ionicons
            name="person-outline"
            size={28}
            color="black"
            onPress={() => {
              navigation.navigate("Profile");
            }}
          />
          <Text style={styles.iconViewText}>Profile</Text>
        </View>
      </View>


      <StatusBar style="dark" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: "#F8F8F8",
  },
  view3: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 30,
  },
  button: {
    marginLeft: 35,
    marginRight: 35,
    marginTop: 240,
    flexDirection: 'row',
    backgroundColor: `#32C5FF`,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    elevation: 18,
    
  },
  buttonText: {
    color: `#fff`,
    fontSize: 25,
    fontFamily: 'Manrope_500Medium',
  },
  optionsContainer: {
    flexDirection: 'row',
    height: 70,
    width: '100%',
    backgroundColor: `white`,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 20,
},
  iconView: {
    
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: "#fff",
    justifyContent: "space-evenly",
    position: 'absolute',
    bottom: 0,
    borderTopEndRadius: 17,
    borderTopLeftRadius: 17,
  },
  iconViewText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 12,
    color: 'black',
  },
  flag: {
    
    width: 38,
    height: 38,
    marginTop: 15,
    marginLeft: 25,
    borderTopEndRadius: 20
  },
  unnecessary: {
    color: "black",
    fontSize: 18,
    marginTop: 15,
    marginLeft: 20
  },
});
