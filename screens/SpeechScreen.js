import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import axios from 'axios';

import DefaultText from '../components/UI/DefaultText';
import Colors from '../constants/Colors';
import UltimatePrize from '../assets/TextSpeech/dankeyKang.jpg';

const recordingOptions = {
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false
    },
};

const SpeechScreen = () => {
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recording, setRecording] = useState(null);
    const [secretSection, setSecretSection] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [ultimatePhrase, setUltimatePhrase] = useState(false);

    const getTransription = async () => {
        setIsFetching(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(recording._uri);
            const formData = new FormData();

            formData.append('file', {
                uri,
                type: Platform.OS === 'android' ? 'audio/m4a' : 'audio/x-wav',
                name: Platform.OS === 'android' ? `${Date.now()}.m4a` : `${Date.now()}.wave`
            });

            const { data } = await axios.post('http://localhost:3005/speech', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            setTranscript(data.transcript);

        } catch (error) {
            console.log('There was an error reading the file.', error);
            stopRecording();
            resetRecording();
        }

        setIsFetching(false);
    };

    const startRecording = async () => {
        const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        if (status !== 'granted') return;
        setIsRecording(true);

        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });

        const recording = new Audio.Recording();

        try {
            await recording.prepareToRecordAsync(recordingOptions);
            await recording.startAsync();
        } catch (error) {
            console.log(error)
            stopRecording();
        }

        setRecording(recording);
    };

    const stopRecording = async () => {
        setIsRecording(false);
        try {
            await recording.stopAndUnloadAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const resetRecording = () => {
        deleteRecordingFile();
        setRecording(null);
    };

    const deleteRecordingFile = async () => {
        try {
            const info = await FileSystem.getInfoAsync(recording._uri);
            await FileSystem.deleteAsync(info.uri);
        } catch (error) {
            console.log('There was an error deleting recorded file.', error);
        }
    };

    const checkForSecret = _transcript => {
        console.log(_transcript);
        if (_transcript == 'magic word' ||
            _transcript == 'magic words' ||
            _transcript == 'huzzah' ||
            _transcript == 'open sesame' ||
            _transcript == 'Alakazam') {
                setSecretSection(true);
        }
        
        if (secretSection &&
                 _transcript == 'please and thank you') {
            setUltimatePhrase(true);
        }
    };

    const onPressOutHandler = () => {
        stopRecording();
        getTransription();
    };

    const capitalizeFirstLetter = (_transcript) => {
        return _transcript.charAt(0).toUpperCase() + _transcript.slice(1);
    };

    useEffect(() => {
        checkForSecret(transcript);
    }, [transcript]);

    return (
        <View style={styles.screen}>
            <TouchableOpacity 
                onPressIn={startRecording}
                onPressOut={onPressOutHandler}
                style={styles.button}
            >
                {isFetching && <ActivityIndicator color={Colors.white} />}
                {!isFetching &&
                    <DefaultText style={styles.text}>
                        {isRecording ? 'Recording...' : 'Start Recording'}
                    </DefaultText>
                }
            </TouchableOpacity>
            {transcript == '' ? <View></View> :
                <View style={styles.textContainer}>
                    <View style={styles.textHeader}>
                        <DefaultText>
                            Google's Cloud Speech-To-Text API says you said:
                        </DefaultText>
                    </View>
                    <DefaultText style={styles.transcriptText}>
                        {capitalizeFirstLetter(transcript)}.
                    </DefaultText>
                    {secretSection ? 
                        <View style={styles.secretSection}>
                            <DefaultText>
                                Huzzah! You have activated the secret section! If you can guess the ultimate magical phrase, you will receive the "ultimate" prize..
                            </DefaultText>
                            {ultimatePhrase ?
                                <Image
                                    style={styles.ultimatePrize}
                                    source={UltimatePrize}
                                />
                                :
                                <View></View>
                            }
                        </View>
                        :
                        <View></View>
                    }
                </View>
            }
        </View>
    );
}

export const screenOptions = () => {
    return {
        headerTitle: 'Speech to Text',
        headerBackTitle: 'Back'
    };
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 5,
        marginTop: 20,
        paddingHorizontal: 8,
        paddingVertical: 20,
        width: '90%'
    },
    screen: {
        alignItems: 'center',
        backgroundColor: Colors.white,
        flex: 1,
        paddingTop: 40,
    },
    secretSection: {
        marginTop: 15
    },
    text: {
        color: Colors.white
    },
    textContainer: {
        flex: 1,
        paddingTop: 15,
        width: '90%'
    }, 
    textHeader: {
        marginBottom: 15
    },
    transcriptText: {
        fontFamily: 'roboto-bold'
    }, 
    ultimatePrize: {
        marginTop: 15,
        width: '100%'
    }
});

export default SpeechScreen;