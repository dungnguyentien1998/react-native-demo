import React, {useState} from 'react';
import { 
    Text, 
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import styles from '../../style/viewappointment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ip as ip} from '../../../ipconfig.json';

export default function ViewAppointment({route, navigation}) {
    const {userId, authorization} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [appts, setAppts] = useState([]);
    const [noAppt, setNoAppt] = useState(false);

    React.useEffect(
        () => navigation.addListener('focus', () => {
            setLoading(true);
            fetch('http://' + ip + ':8080/getClientAppointments/' + userId, {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                },
            })
            .then((response) => (response.status === 204 ? [] : response.json()))
            .then((json) => {
                setAppts(json);
                if (json.length === 0) 
                    setNoAppt(true);
                else
                    setNoAppt(false);
            })
            .catch((error) => {
                Alert.alert(
                    "Thông báo",
                    "Lỗi kết nối",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ]
                );
            })
            .finally(() => setLoading(false))
        })
    ,[]);

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

    return (
        noAppt ?
        <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#191970', fontSize: 20}}>Bạn chưa có lịch hẹn nào</Text>
        </View>
        :
        (isLoading ? <ActivityIndicator style={styles.loading} size={100} color='#191970'/> : (
        <View style={styles.container}>
            <View>
                <FlatList
                    style={{marginVertical: 20, marginHorizontal: 20}}
                    data={appts}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate('AppointmentDetail', {appt: item, userId: userId, authorization: authorization})}
                            style={{backgroundColor: 'white', height: 120, marginVertical: 10, justifyContent: 'center', elevation: 0, borderColor: '#191970', borderWidth: 3, borderRadius: 10}}
                        >
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome5 style={{marginHorizontal: 20}} name='calendar-check' size={60} color='#191970' solid/>
                                <View>
                                    <View>
                                        <Text style={{fontSize: 26, fontWeight: 'bold', color: '#191970'}}>{item.clinicServiceName}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 22, marginRight: 20}}>{changeDateFormat(item.calendarDate, 1)}</Text>
                                        <Text style={{fontSize: 22}}>{changeTimeFormat(item.calendarTimeStart)}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        )}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        </View>))
    );
}