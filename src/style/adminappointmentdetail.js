import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    subContainer: {
        backgroundColor: 'white',
        marginHorizontal: 40,
        marginTop: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        elevation: 5
    },
    label: {
        fontSize: 18, 
        color: 'gray'
    },
    txtInfo: {
        marginTop: 5,
        color: 'black', 
        paddingHorizontal: 15, 
        fontSize: 20, 
        fontWeight:'bold'
    },
    btnContainer: {
        marginTop: Math.round(screenHeight/40),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
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
    line: {
        height: 5,
        backgroundColor:'#dcdcdc',
        marginVertical: 3
    }
});

export default styles;