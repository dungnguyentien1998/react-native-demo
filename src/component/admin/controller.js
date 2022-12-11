import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import styles from '../../style/controller';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Controller({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <TouchableOpacity 
                    style={[styles.item, {backgroundColor: '#e6e6fa'}]}
                    onPress={() => navigation.navigate('ServiceController', {userId: userId, authorization: authorization})}
                >
                    <FontAwesome5 style={styles.icon} name='medkit' size={60} color='#191970' solid/>
                    <Text style={styles.title}>Quản lý dịch vụ</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('CalendarController', {userId: userId, authorization: authorization})} 
                    style={[styles.item, {backgroundColor: '#e6e6fa'}]}
                >
                    <FontAwesome style={styles.icon} name='calendar' size={60} color='#191970' solid/>
                    <Text style={styles.title}>Quản lý lịch hoạt động</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AppointmentController', {userId: userId, authorization: authorization})} 
                    style={[styles.item, {backgroundColor: '#e6e6fa'}]}
                >
                    <FontAwesome5 style={styles.icon} name='calendar-check' size={60} color='#191970' solid/>
                    <Text style={styles.title}>Quản lý lịch hẹn</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    onPress={() => navigation.navigate('AccountController', {userId: userId, authorization: authorization})} 
                    style={[styles.item, {backgroundColor: '#e6e6fa'}]}
                >
                    <FontAwesome5 style={styles.icon} name='user-cog' size={60} color='#191970' solid/>
                    <Text style={styles.title}>Quản lý tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}