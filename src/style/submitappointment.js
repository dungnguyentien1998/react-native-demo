import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#d3d3d3'
    },
    textContainer: {
        height: Math.round(screenHeight/8),
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        elevation: 10,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        alignItems: 'center'
    },
    title: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#191970'
    },
    content: {
        flex: 1,
        fontSize: 22,
        marginLeft: 60
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
        padding: 10,
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