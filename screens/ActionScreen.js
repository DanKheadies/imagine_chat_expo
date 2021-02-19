import React from 'react';
import { Button, Platform, StyleSheet, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';

const ActionScreen = props => {
    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button 
                    color={Colors.accent}
                    onPress={() => {
                        props.navigation.navigate('Chat');
                    }}
                    title='Simulate Chat'
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    color={Colors.accent}
                    onPress={() => {
                        props.navigation.navigate('Speech',);
                    }}
                    title='Google Speech-to-Text'
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    color={Colors.accent}
                    onPress={() => {
                        props.navigation.navigate('Speech',);
                    }}
                    title='SoapBox Verification'
                />
            </View>
        </View>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: 'Imagine Chat',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item 
                    title='Menu'
                    iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    screen: {
        alignItems: 'center',
        backgroundColor: Colors.primary,
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 50
    }
});

export default ActionScreen;