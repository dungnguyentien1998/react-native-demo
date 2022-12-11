import React from 'react';
import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    item: {
        flex: 1,
        height: 200,
        margin: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        borderRadius: 15
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#191970',
        fontWeight: 'bold' 
    },
    icon: {
        marginBottom: 20
    }
});

export default styles;