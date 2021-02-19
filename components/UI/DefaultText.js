import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const DefaultText = props => {
    return (
        <Text style={{...styles.text, ...props.style}}>
            {props.children}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: Colors.blackPrimary,
        fontFamily: 'roboto-light',
        fontSize: 16
    }
});

export default DefaultText;