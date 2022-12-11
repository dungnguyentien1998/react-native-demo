import React, {useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Alert,
    ActivityIndicator
} from 'react-native';
import {ip as ip} from '../../../ipconfig.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../style/submitappointment';
import ClientTabNavigator from './tabnavigator';

const screenHeight = Dimensions.get('window').height;

export default function AppointmentDetail({route, navigation}) {
    const {appt, userId, authorization} = route.params;
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
        fetch('http://'+ ip + ':8080/appointments/' + appt.id, {
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
                                onPress: () => navigation.popToTop()
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
        <View style={styles.container}>
            {isLoading &&
            <View style={[styles.loading, {backgroundColor: 'rgba(192,192,192,0.7)'}]}></View>
            }
            {isLoading &&
            <View style={styles.loading}>
                <ActivityIndicator size={100} color='#191970'/>
            </View>
            }
            <View style={[styles.textContainer, {marginTop: Math.round(screenHeight/30)}]}>
                <View style={styles.titleContainer}>
                    <FontAwesome5 name='medkit' color='#191970' size={25}/>
                    <Text style={styles.title}>Dịch vụ</Text>
                </View>
                <Text style={styles.content}>{appt.clinicServiceName}</Text>
            </View>

            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <FontAwesome5 name='calendar-alt' color='#191970' size={25} solid/>
                    <Text style={styles.title}>Ngày</Text>
                </View>
                <Text style={styles.content}>{changeDateFormat(appt.calendarDate, 1)}</Text>
            </View>

            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <FontAwesome5 name='clock' color='#191970' size={25} solid/>
                    <Text style={styles.title}>Giờ</Text>
                </View>
                <Text style={styles.content}>{changeTimeFormat(appt.calendarTimeStart)}</Text>
            </View>

            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <FontAwesome5 name='clinic-medical' color='#191970' size={25}/>
                    <Text style={styles.title}>Phòng</Text>
                </View>
                <Text style={styles.content}>{appt.room}</Text>  
            </View>

            <View style={styles.textContainer}>
                <View style={styles.titleContainer}>
                    <FontAwesome5 name='user-md' color='#191970' size={25}/>
                    <Text style={styles.title}>Nhân viên y tế</Text>
                </View>
                <Text style={styles.content}>{appt.medicalStaff}</Text>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity 
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
                    style={styles.button}
                >
                    <Text style={styles.btnText}>Hủy lịch hẹn</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}