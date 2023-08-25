import React from "react";
import { View, ActivityIndicator } from 'react-native';

const LoadingModal = () => {
    return (
        <View style={{justifyContent: 'center', alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1}}>
            <ActivityIndicator size={60} color={"white"} />
        </View>
    )
};

export default LoadingModal;