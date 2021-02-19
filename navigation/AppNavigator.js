import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

import ActionScreen, { screenOptions as actionScreenOptions } from '../screens/ActionScreen';
import ChatScreen, { screenOptions as chatScreenOptions } from '../screens/ChatScreen';
import SpeechScreen, { screenOptions as speechScreenOptions } from '../screens/SpeechScreen';
import VerificationScreen, { screenOptions as verificationScreenOptions } from '../screens/VerificationScreen';


const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.accent : ''
    },
    headerBackTitleStyle: {
        fontFamily: 'roboto-light'
    },
    headerTitleStyle: {
        fontFamily: 'roboto-regular'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accent
};

const ImagineStackNavigator = createStackNavigator();

const ImagineNavigator = () => {
    return (
        <ImagineStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ImagineStackNavigator.Screen 
                component={ActionScreen}
                name='Action'
                options={actionScreenOptions}
            />
            <ImagineStackNavigator.Screen 
                component={ChatScreen}
                name='Chat'
                options={chatScreenOptions}
            />
            <ImagineStackNavigator.Screen 
                component={SpeechScreen}
                name='Speech'
                options={speechScreenOptions}
            />
            <ImagineStackNavigator.Screen 
                component={VerificationScreen}
                name='Verification'
                options={verificationScreenOptions}
            />
        </ImagineStackNavigator.Navigator>
    );
};

const AlphaNavigator = createDrawerNavigator();

export const ImagineDrawer = () => {
    return (
        <AlphaNavigator.Navigator
            drawerContent={props => {
                return (
                    <View style={{ flex: 1 }}>
                        <SafeAreaView
                            forceInset={{
                                horizontal: 'never',
                                top: 'always'
                            }}
                            style={{
                                paddingTop: Platform.OS === 'android' ? 30 : 10
                            }}
                        >
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions={{
                activeTintColor: Colors.accent
            }}
        >
            <AlphaNavigator.Screen
                component={ImagineNavigator}
                name="Imagine Chat"
                options={{
                    drawerIcon: props => (
                        <Ionicons
                            color={props.color}
                            name={Platform.OS === 'android' ? 'md-person' : 'ios-person'}
                            size={23}
                        />
                    )
                }}
            />
        </AlphaNavigator.Navigator>
    );
};