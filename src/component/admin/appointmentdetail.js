import React, {useState} from 'react';
import {
    Text, 
    View,
    Image,
    TextInput,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import styles from '../../style/adminappointmentdetail';
import {ip as ip} from '../../../ipconfig.json';

const screenHeight = Dimensions.get('window').height;

export default function AppointmentDetail({route, navigation}) {
    const {appt, authorization} = route.params;
    const [isLoading, setLoading] = useState(false);

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
    function changeTimeFormat(time) {
        if (time.length === 8)
            return time.substr(0,5);
        else if (time.length === 5)
            return (time + ":00");
    }

    function deleteAppt() {
        fetch('http://' + ip + ':8080/appointments/' + appt.id, {
                method: 'DELETE',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                },
            })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    Alert.alert(
                        "Thông báo",
                        "Xóa lịch hẹn thành công!",
                        [
                            {
                                text: "OK",
                                onPress: () => navigation.pop(1)
                            }
                        ]
                    );
                } else {
                    Alert.alert(
                        "Thông báo",
                        "Đã xảy ra lỗi!",
                        [
                            {
                                text: "OK",
                                style: 'cancel'
                            }
                        ]
                    );
                }
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert(
                    "Thông báo",
                    "Đã xảy ra lỗi!",
                    [
                        {
                            text: "OK",
                            style: 'cancel'
                        }
                    ]
                );
            })
    }

    return (
        <ScrollView style={styles.container}>
            {isLoading &&
            <View style={[styles.loading, {backgroundColor: 'rgba(192,192,192,0.7)'}]}></View>
            }
            {isLoading &&
            <View style={styles.loading}>
                <ActivityIndicator size={100} color='#191970'/>
            </View>
            }

            <View style={styles.subContainer}>
                <Text style={styles.label}>Dịch vụ</Text>
                <Text style={styles.txtInfo}>{appt.clinicServiceName}</Text>
            </View>
                
            <View style={styles.subContainer}>
                <Text style={styles.label}>Tên khách hàng</Text>
                <Text style={styles.txtInfo}>{appt.clientName}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.label}>Ngày</Text>
                <Text style={styles.txtInfo}>{changeDateFormat(appt.calendarDate, 1)}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.label}>Thời gian bắt đầu</Text>
                <Text style={styles.txtInfo}>{changeTimeFormat(appt.calendarTimeStart)}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.label}>Thời gian kết thúc</Text>
                <Text style={styles.txtInfo}>{changeTimeFormat(appt.calendarTimeEnd)}</Text>
            </View>
                
            <View style={styles.subContainer}>
                <Text style={styles.label}>Phòng</Text>
                <Text style={styles.txtInfo}>{appt.room}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.label}>Nhân viên y tế</Text>
                <Text style={styles.txtInfo}>{appt.medicalStaff}</Text>
            </View>
            
            <View style={[styles.btnContainer, {flexDirection: 'row'}]}>
                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'red'}]}
                    onPress={() => {
                        Alert.alert(
                            "Thông báo",
                            "Bạn có chắc chắn muốn xóa lịch hẹn này?",
                            [
                                {
                                    text: "Có",
                                    onPress: () => {
                                        setLoading(true);
                                        deleteAppt();
                                    }
                                },
                                {
                                    text: "Không",
                                    style: 'cancel'
                                }
                            ]
                        )
                    }} 
                >
                    <Text style={styles.btnText}>Xóa</Text>
                </TouchableOpacity>
            </View>       
        </ScrollView>
    );
}