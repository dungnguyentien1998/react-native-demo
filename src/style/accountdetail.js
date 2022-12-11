import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
       
    },
    avatarContainer:{
        flexDirection: 'row', 
        backgroundColor: 'white', 
        alignItems: 'center'
    },
    infoContainer: {
        marginTop: 10, 
        backgroundColor: 'white', 
        padding: 8
    },
    label: {
        marginLeft: 7, 
        fontSize: 16, 
        color: 'gray'
    },
    txtInfo: {
        marginLeft: 7, 
        color: 'black', 
        padding: 0, 
        fontSize: 18, 
        fontWeight:'bold'
    },
    line: {
        marginHorizontal: 7, 
        backgroundColor:'#dcdcdc', 
        height: 1, 
        marginBottom: 10
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    btnContainer: {
        backgroundColor: '#87cefa', 
        marginTop: 10, 
        padding: 10, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18, 
        fontWeight: 'bold'
    }
});

export default styles;
