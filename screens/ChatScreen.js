import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Video } from 'expo-av';

import Colors from '../constants/Colors';

const PrincessScreen = props => {
    const [video, setVideo] = useState(null);

    useEffect(() => {
        setVideo('https://firebasestorage.googleapis.com/v0/b/imagine-chat-webs.appspot.com/o/PrincessPrincess.m4v?alt=media&token=7f26673f-0e27-41e4-9011-0f07acff412a');
    }, []);

    return (
        <View style={styles.screen}>
            <Video
                source={{ uri: video }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                isLooping
                style={styles.backgroundVideo}
            />
            <View style={styles.buttonContainer}>
                <Button 
                    color={Colors.redPrimary}
                    onPress={() => {
                        props.navigation.navigate('Action');
                    }}
                    title='End Call'
                />
            </View>
        </View>
    );
}

export const screenOptions = () => {
    return {
        headerShown: false
    }
};

const styles = StyleSheet.create({
    backgroundVideo: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    buttonContainer: {
        bottom: 25,
        alignItems: 'center',
        position: "absolute",
        width: '100%'
    },
    screen: {
        flex: 1
    }
});

export default PrincessScreen;