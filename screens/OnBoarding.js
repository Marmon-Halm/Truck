import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    SafeAreaView,
    Image,
    StyleSheet,
    FlatList,
    View,
    Text,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts, Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold, } from '@expo-google-fonts/manrope';


// slides
const slides = [
    {
        id: '1',
        image: require('../assets/img1.png'),
        title: 'TRIP PLANNING',
        description: 'Order rides based on load type by selecting the vehicle type to transport load',
    },
    {
        id: '2',
        image: require('../assets/img2.png'),
        title: 'ROUTE OPTIMIZATION',
        description: 'Using algorithms to provide best routes for a trip to provide the shortest possible time to complete trips',
    },
    {
        id: '3',
        image: require('../assets/img3.png'),
        title: 'SAFE & SECURE TRIPS',
        description: 'Trips are fully secure and tracked providing real-time update',
    },
    {
        id: '4',
        image: require('../assets/img4.png'),
        title: 'HELP CENTER',
        description: "You can reach our team through the help center. Click to get started!",
    },
];

const Slide = ({ item }) => {

    const { width } = useWindowDimensions();
    return (

        <View style={[styles.container, { width }]}>

            <Image source={item.image} style={[styles.image, { width, resizeMode: 'contain' }]} />
            <View style={{ flex: 0.3 }}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>

        </View>
    )
};

function OnBoarding({ navigation }) {

    const { width, height } = useWindowDimensions();

    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0)
    const ref = React.useRef(null);
    const Footer = () => {



        return <View style={{ height: height * 0.15, justifyContent: "space-between", paddingHorizontal: 20, }}>
            {/* indicator start */}
            <View style={{ flexDirection: "row", justifyContent: "center", }}>

                {slides.map((_, index) => (
                    <View key={index} style={[styles.indicator, currentSlideIndex == index && {
                        backgroundColor: '#000',
                        width: 25,
                    }]} />
                ))}

            </View>
            {/* indicator ends */}

            <View style={{ marginBottom: 20, }}>


                {
                    currentSlideIndex == slides.length - 1 ? (<View style={{ height: 50, }}>
                        <TouchableOpacity style={[styles.btnGT]} onPress={() => { navigation.navigate('Login') }}>
                            <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 17, color: '#fff' }}>Get Started</Text>
                        </TouchableOpacity>
                    </View>) : (
                        <View style={{ flexDirection: "row" }}>
                            {/* skip btn */}
                            <TouchableOpacity style={[styles.btnSkip, { backgroundColor: "transparent", borderWidth: 1, }]}
                                onPress={skip}>
                                <Text style={{ fontFamily: 'Manrope_700Bold', fontSize: 17, color: '#000' }}>SKIP</Text>
                            </TouchableOpacity>

                            {/* space between */}
                            <View style={{ width: 15 }} />
                            {/* next btn */}
                            <TouchableOpacity style={[styles.btnNext]} onPress={goNextSlide}>
                                <Text style={styles.nextText}>NEXT</Text>
                            </TouchableOpacity>
                        </View>

                    )
                }

            </View>
        </View>
    }


    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    // next btn
    const goNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current?.scrollToOffset({ offset });
            setCurrentSlideIndex(nextSlideIndex)
        }
    };

    // skip btn
    const skip = () => {

        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current?.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex)
    }

    let [fontsLoaded] = useFonts({
        Manrope_400Regular,
        Montserrat_400Regular,
        Manrope_500Medium,
        Montserrat_500Medium,
        Manrope_600SemiBold,
        Montserrat_600SemiBold,
        Manrope_700Bold,
        Montserrat_700Bold,
    });


    if (!fontsLoaded) {
        return <AppLoading />;
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar style="dark" />
            <FlatList data={slides}
                ref={ref}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                renderItem={({ item }) => <Slide item={item} />} />

            <Footer />
        </SafeAreaView>
    );
}


// stylesheet

const styles = StyleSheet.create({
    image: {
        flex: 0.7,
        justifyContent: "center"
    },
    title: {
        fontSize: 30,
        marginBottom: 15,
        color: '#F76A03',
        textAlign: 'center',
        fontFamily: 'Manrope_700Bold',
    },
    description: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 54,
        fontFamily: 'Manrope_600SemiBold',
    },
    indicator: {
        height: 6,
        width: 10,
        marginHorizontal: 3,
        borderRadius: 4,
        backgroundColor: '#DDDDDD'
    },
    btnSkip: {
        flex: 1,
        backgroundColor: `#016e96`,
        padding: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    btnNext: {
        flex: 1,
        backgroundColor: `#000`,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    btnGT: {
        flex: 1,
        backgroundColor: `#000`,
        padding: 15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    nextText: {
        fontFamily: 'Manrope_700Bold',
        fontSize: 17,
        color: '#fff',
    },
})

export default OnBoarding;