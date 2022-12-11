import React from 'react';
import {
    StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 80
    },
    textInput: {
        width: 350,
        padding: 10,
        fontSize: 18,
        marginVertical: 15,
    },
    btnSignup: {
        marginTop: 30,
        backgroundColor: '#191970',
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 10,
    },
    text: {
        padding: 10,
        color: 'white',
        fontSize: 18,
    },
    title : {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#191970',
        textAlign: 'center'
    },
    require:{
        fontSize: 8,
        color: 'gray'
    }
});

export default styles;