import React, {useState} from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Dimensions,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import {ip as ip} from '../../../ipconfig.json';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from '../../style/makeappointment';

const ScreenHeight = Dimensions.get('window').height;

export default function MakeAppointment({route, navigation}) {
    const {service, userId, authorization} = route.params;
    const [datetime, setDatetime] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showSuggest, setShowSuggest] = useState(false);
    const [time, setTime] = useState(showTime(datetime));
    const [date, setDate] = useState(showDate(datetime));
    const [cals, setCals] = useState([]);
    const [noCal, setNoCal] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [selectedCal, setSelectedCal] = useState({});
    const [selectedId, setSelectedId] = useState(-1);
    const [submit, setSubmit] = useState(false);

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

    function getSuitableCals(date, time, serviceId) {
        setLoading(true);
        setNoCal(false);
        return fetch('http://'+ ip + ':8080/getCalendars', {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                },
                body: JSON.stringify({
                    date: date,
                    time: time,
                    serviceId: serviceId
                })
            })
            .then((response) => response.json())
            .then((json) => {
                setCals(json);
                if (json.length === 0) 
                    setNoCal(true);
                else
                    setNoCal(false);
            })
            .catch((error) => {
                setCals([]);
                setNoCal(true);
                Alert.alert(
                    "Thông báo",
                    "Lỗi kết nối!",
                    [
                        {
                            text: "OK",
                            style: "cancel"
                        }
                    ]
                )
            })
            .finally(() => setLoading(false));
    }

    function showTime(selectTime) {
        h = selectTime.getHours();
        mi = selectTime.getMinutes();
        tmp = ((h > 9) ? h : '0' + h) + ':' + ((mi > 9) ? mi : '0' + mi);
        return tmp;
    }

    function showDate(selectTime) {
        d = selectTime.getDate();
        m = selectTime.getMonth() + 1;
        y = selectTime.getFullYear();
        tmp = ((d > 9) ? d : '0' + d) + '/' + ((m > 9) ? m : '0' + m) + '/' + y;
        return tmp;
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || datetime;
        setShowDatePicker(false);
        setDatetime(currentDate);
        if (mode === 'date') {
            tmp = showDate(currentDate);
            setDate(tmp);
        }
        if (mode === 'time') {
            tmp = showTime(currentDate);
            setTime(tmp);
        }
    };

    const showMode = currentMode => {
        setShowDatePicker(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    return(
        <View style={styles.container}>
            <View style={[styles.subContainer, {marginTop: Math.round(ScreenHeight/20)}]}>
                <Text style={styles.title}>
                    Dịch vụ
                </Text>
                <Text style={styles.content}>
                    {service.name}
                </Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.title}>
                    Chọn lịch khám
                </Text>

                <View>
                    <Text style={styles.content}>Chọn thời gian</Text>

                    <View style={styles.dateTimeContainer}>
                        <FontAwesome5 name={'clock'} size={32} solid/>
                        <Text onPress={showTimepicker} style={styles.timeBox}>{time}</Text>
                        <FontAwesome5 name={'calendar-alt'} size={32} solid/>
                        <Text onPress={showDatepicker} style={styles.dateBox}>{date}</Text>
                        <TouchableOpacity 
                            onPress={() => {
                                getSuitableCals(changeDateFormat(date, 0), changeTimeFormat(time), service.id);
                                setShowSuggest(true);
                                setSelectedId(-1);
                                setSubmit(false);
                            }} 
                            style={styles.btnFind}
                        >
                            <FontAwesome5 name={'search'} size={20} color='white'/>
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={datetime}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}       
                        
                    {showSuggest && (
                        isLoading ? <ActivityIndicator size={100} color='#191970'/> :
                        (noCal ? <Text style={styles.content}>Không có lịch hẹn phù hợp. Vui lòng chọn thời gian khác.</Text> :
                        <View>
                            <Text style={styles.content}>Gợi ý</Text>
                            <FlatList
                                style={{height: Math.round(0.3 * ScreenHeight), marginHorizontal: 10, marginBottom: 10}}
                                data={cals}
                                renderItem={({item}) => (
                                    <TouchableOpacity 
                                        onPress={() => {
                                            setDate(changeDateFormat(item.date, 1));
                                            setTime(changeTimeFormat(item.timeStart));
                                            setSelectedCal(item);
                                            if (item.id === selectedId) {
                                                setSelectedId(-1);
                                                setSubmit(false);
                                            }
                                            else {
                                                setSelectedId(item.id);
                                                setSubmit(true);
                                            }
                                        }}
                                        style={[styles.listItem, {backgroundColor: item.id === selectedId ? 'green' : '#191970'}]}
                                    >
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 10}}>
                                                <FontAwesome5 name={'clock'} color='white' size={25} solid/>
                                                <Text style={styles.txtList}>{changeTimeFormat(item.timeStart)}</Text>
                                            </View>

                                            <View style={{flexDirection: 'row'}}>
                                                <FontAwesome5 name={'calendar-alt'} color='white' size={25} solid/>    
                                                <Text style={styles.txtList}>{changeDateFormat(item.date, 1)}</Text>
                                            </View>

                                            <View style={{flexDirection: 'row'}}>
                                                <FontAwesome5 name={'clinic-medical'} color='white' size={25} solid/>
                                                <Text style={styles.txtList}>{item.room}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.id.toString()}
                            />
                        </View>
                        )
                    )}      
                </View>
            </View>

            {submit && 
            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('SubmitAppointment', {
                        calendar: selectedCal,
                        userId: userId,
                        authorization: authorization
                    })}
                >
                    <Text style={styles.btnText}>Tạo lịch hẹn</Text>
                </TouchableOpacity>
            </View>
            }
        </View>
    );
}