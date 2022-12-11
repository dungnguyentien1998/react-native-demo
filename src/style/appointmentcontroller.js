import React from 'react';
import {
    StyleSheet,
    Dimensions
} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    dateBar: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dateBox: {
        marginHorizontal:10,
        fontSize: 20, 
        borderWidth: 2, 
        textAlign:'center', 
        textAlignVertical: 'center', 
        padding: 5,
        fontWeight: 'bold',
        color: '#191970'
    },
    apptContainer: {
        height: Math.round(screenHeight*0.6),
        marginHorizontal: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2
    },
    txtList: {
        fontSize: 20, 
        color: '#191970',
        marginLeft: 10,
        marginRight: 10,
        fontWeight: 'bold'
    },
    item: {
        backgroundColor: '#e6e6fa',
        width: 340,
        height: 80, 
        marginVertical: 5,
        justifyContent: 'center', 
        elevation: 3, 
        borderRadius: 15
    },
    itemRow: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginLeft: 10, 
        width: 150
    },
    btnContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10
    },
    btnFind: {
        backgroundColor: '#191970', 
        borderRadius: 10,
        padding: 5
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        padding: 10,
    }
});

export default styles;