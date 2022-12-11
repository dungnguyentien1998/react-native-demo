import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    listContainer: {
        height: Math.round(screenHeight * 0.5),
        marginVertical: 20, 
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },
    button: {
        backgroundColor: '#191970',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        padding: 10,
    },
    item: {
        backgroundColor: '#e6e6fa',
        marginHorizontal: 20, 
        height: 80, 
        marginVertical: 10,
        justifyContent: 'center', 
        elevation: 5, 
        borderRadius: 15
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#191970'
    }
});

export default styles;