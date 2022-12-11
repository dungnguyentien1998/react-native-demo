import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        height: ScreenHeight,
        width: ScreenWidth,
    },
    subContainer: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        elevation: 10,
    },
    title: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#191970'
    },
    content: {
        marginLeft: 20,
        fontSize: 16,
        marginBottom: 10
    },
    dateTimeContainer: {
        marginLeft: 30,
        flexDirection: 'row', 
        alignItems: 'center',
        marginBottom: 10
    },
    dateBox: {
        marginHorizontal:10,
        marginRight: 15, 
        fontSize: 16, 
        borderWidth: 1, 
        textAlign:'center', 
        textAlignVertical: 'center', 
        padding: 3
    },
    timeBox: {
        marginHorizontal:10,
        marginRight: 20, 
        fontSize: 16, 
        borderWidth: 1, 
        textAlign:'center', 
        textAlignVertical: 'center', 
        padding: 3
    },
    btnFind: {
        backgroundColor: '#191970', 
        padding: 5, 
        borderRadius: 5
    },
    listItem: {
        borderRadius: 10, 
        height: 60, 
        marginVertical: 3, 
        justifyContent: 'center'
    },
    txtList: {
        fontSize: 20, 
        color: 'white',
        marginLeft: 5,
        marginRight: 10
    },
    btnContainer: {
        marginTop: 20,
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
    }
});

export default styles;