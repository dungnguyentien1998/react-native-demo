import React, {useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
} from 'react-native';
import styles from '../../style/appointmentcontroller';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ip as ip} from '../../../ipconfig.json';

export default function ViewAppointment({route, navigation}) {
    const {userId, authorization} = route.params;
    const [datetime, setDatetime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(showDate(datetime));
    const [isLoading, setLoading] = useState(true);
    const [appts, setAppts] = useState([]); 
    const [noAppt, setNoAppt] = useState(false);

    React.useEffect(
        () => navigation.addListener('focus', () => {
            getAppt();
        }), []);

    getAppt = async () => {
        var d = await changeDateFormat(date, 0);
        setLoading(true);
        fetch('http://' + ip + ':8080/getMedicalStaffAppointmentsByDate/' + userId + "?date=" + d, {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: authorization
            }
        })
            .then((response) => response.status === 204 ? [] : response.json())
            .then((json) => {
                setAppts(json);
                if (json.length === 0) 
                    setNoAppt(true);
                else
                    setNoAppt(false);
                return json;
            })
            .catch((error) => {
                setNoAppt(true);
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
    }
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

    function showDate(selectTime) {
        d = selectTime.getDate();
        m = selectTime.getMonth() + 1;
        y = selectTime.getFullYear();
        tmp = ((d > 9) ? d : '0' + d) + '/' + ((m > 9) ? m : '0' + m) + '/' + y;
        return tmp;
    }

    const onChange = async (event, selectedDate) => {
        const currentDate = await selectedDate || datetime;
        setShowDatePicker(false);
        setDatetime(currentDate);
        tmp = await showDate(currentDate);
        await setDate(tmp);
        getAppt();
    };

    return (
        <View style={styles.container}>
            <View style={styles.dateBar}>
                <TouchableOpacity>
                    <AntDesign
                        name='caretleft' size={35} color='#191970'
                        onPress={async () =>{
                            await datetime.setDate(datetime.getDate() - 1);
                            await setDate(showDate(datetime));
                            getAppt();
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text  style={styles.dateBox}>{date}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <AntDesign
                        name='caretright' size={35} color='#191970' 
                        onPress={async () =>{
                            await datetime.setDate(datetime.getDate() + 1);
                            await setDate(showDate(datetime));
                            getAppt();
                        }}
                    />
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={datetime}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}     

            <View style={styles.apptContainer}>
                {isLoading ? <ActivityIndicator size={100} color='#191970'/> :
                    (noAppt ? <Text style={{color: '#191970', fontSize: 20}}>Không có lịch hẹn nào.</Text> :
                        <FlatList
                            style={{marginVertical: 5}}
                            data={appts}
                            renderItem={({item}) => (
                                <TouchableOpacity style={styles.item}
                                    onPress={() => navigation.navigate('AppointmentDetail', {appt: item, authorization: authorization})}>
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={styles.itemRow}>
                                            <FontAwesome5 name={'medkit'} color='#191970' size={25} solid/>
                                            <Text style={styles.txtList}>{item.clinicServiceName}</Text>
                                        </View>
                                        <View style={styles.itemRow}>
                                            <FontAwesome5 name={'clinic-medical'} color='#191970' size={25} solid/>
                                            <Text style={styles.txtList}>{item.room}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                            <View style={styles.itemRow}>
                                                <FontAwesome5 name={'clock'} color='#191970' size={25} solid/>
                                                <Text style={styles.txtList}>{changeTimeFormat(item.calendarTimeStart)}</Text>
                                            </View>

                                            <View style={styles.itemRow}>
                                                <FontAwesome5 style={{marginHorizontal: 3}} name={'calendar-alt'} color='#191970' size={25} solid/>    
                                                <Text style={styles.txtList}>{changeDateFormat(item.calendarDate, 1)}</Text>
                                            </View>
                                        </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    )
                }
            </View>
        </View>
    );
}