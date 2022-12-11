import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 10
    },
    subContainer: {
        marginTop: 10,
        marginHorizontal: 50
    },
    label: {
        fontSize: 18, 
        color: 'gray'
    },
    txtInfo: {
        marginTop: 5,
        color: 'black', 
        paddingHorizontal: 10, 
        fontSize: 20, 
        fontWeight:'bold',
        borderWidth: 2,
        borderColor: 'gray',
        height: 50,
        textAlignVertical: 'center'
    },
    btnContainer: {
        marginTop: Math.round(screenHeight/40),
        alignItems: 'center',
        justifyContent: 'center',
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
        padding: 7
    },
    loading: {
        elevation: 11,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    serviceBar: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
});

export default styles;