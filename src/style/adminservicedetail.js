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
        marginHorizontal: 10
    },
    label: {
        fontSize: 16, 
        color: 'gray'
    },
    txtInfo: {
        marginTop: 5,
        color: 'black', 
        paddingHorizontal: 10, 
        fontSize: 18, 
        fontWeight:'bold',
        borderWidth: 2,
        borderColor: 'gray',
        height: 50
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
    }
});

export default styles;