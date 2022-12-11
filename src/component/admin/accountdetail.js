import React, {useState} from 'react';
import {
    Text, 
    View,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Alert, 
    TouchableOpacity
} from 'react-native';
import styles from '../../style/accountdetail';
import {ip as ip} from '../../../ipconfig.json';

export default function AccountDetail({route, navigation}) {
    const {selectRole, user} = route.params;

    function changeDateFormat(date, mode) {
        if (mode === 0) {
            // Chuyen tu dang 29/06/2020 thanh 2020-06-29
            tmp = date.split("/");
            return (tmp[2] + "-" + tmp[1] + "-" + tmp[0]);
        }
        else if (mode === 1) {
            // Chuyen tu dang 2020-06-29 thanh 29/06/2020
            tmp = date.split("-");
            return (tmp[2] + "/" + tmp[1] + "/" + tmp[0]);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Họ tên</Text>
                <Text style={styles.txtInfo}>{user.name}</Text>
                <View style={styles.line}></View>
                
                <Text style={styles.label}>Giới tính</Text>
                <Text style={styles.txtInfo}>{user.gender === null ? "Nam" : user.gender}</Text>
                <View style={styles.line}></View>

                <Text style={styles.label}>Ngày sinh</Text>
                <Text style={styles.txtInfo}>{user.dateOfBirth === null ? "dd/mm/yyyy" : changeDateFormat(user.dateOfBirth, 1)}</Text>
                <View style={styles.line}></View>

                <Text style={styles.label}>Địa chỉ</Text>
                <Text style={styles.txtInfo}>{user.address === null ? "" : user.address}</Text>
                <View style={styles.line}></View>

                <Text style={styles.label}>Quốc tịch</Text>
                <Text style={styles.txtInfo}>{user.country === null ? "" : user.country}</Text>
                <View style={styles.line}></View>

                <Text style={styles.label}>Số điện thoại</Text>
                <Text style={styles.txtInfo}>{user.username}</Text>
                <View style={styles.line}></View>

                <Text style={styles.label}>Email</Text>
                <Text style={styles.txtInfo}>{user.email}</Text>
                <View style={styles.line}></View>

                {(selectRole === "MEDIC") &&
                <>
                <Text style={styles.label}>Phòng</Text>
                <Text style={styles.txtInfo}>{user.room}</Text>
                <View style={styles.line}></View>
                </>
                }
            </View>
        </ScrollView>
    );
}