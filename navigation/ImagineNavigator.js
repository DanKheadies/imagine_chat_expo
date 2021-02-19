import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ImagineDrawer } from './AppNavigator';

const ImagineNavigator = () => {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            <ImagineDrawer />
        </NavigationContainer>
    );
};

export default ImagineNavigator;