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
import styles from '../../style/calendardetail';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';
import {ip as ip} from '../../../ipconfig.json';

const screenHeight = Dimensions.get('window').height;

export default function CalendarDetail({route, navigation}) {
    const {calendar, authorization} = route.params;
    const [isLoading, setLoading] = useState(false);
    const [datetime, setDatetime] = useState(new Date());
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [date, setDate] = useState(changeDateFormat(calendar.date, 1));
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [timeS, setTimeS] = useState(changeTimeFormat(calendar.timeStart));
    const [showDatePicker3, setShowDatePicker3] = useState(false);
    const [timeE, setTimeE] = useState(changeTimeFormat(calendar.timeEnd));
    const [editable, setEditable] = useState(false);
    const [state, setState] = useState(calendar.state);

    const stateList = new Map([
        [1, "Đã đặt"],
        [0, "Chưa đặt"]
    ]);

    function updateCalendar() {
        setLoading(true);
        fetch('http://' + ip + ':8080/calendars/' + calendar.id + '?clinicServiceId=' + 
            calendar.clinicServiceId + '&medicalStaffId=' + calendar.medicalStaffId, {
                method: 'PUT',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                },
                body: JSON.stringify({
                    date: changeDateFormat(date, 0),
                    timeStart: changeTimeFormat(timeS),
                    timeEnd: changeTimeFormat(timeE),
                    state: state
                })
            })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    Alert.alert(
                        "Thông báo",
                        "Cập nhật lịch hoạt động thành công!",
                        [
                            {
                                text: "OK",
                                onPress:  () => {
                                    navigation.pop(1);
                                }
                            }
                        ]
                    );
                } else {
                    if (response.status === 500) {
                        Alert.alert(
                            "Thông báo",
                            "Thời gian bị trùng với lịch hoạt động khác!",
                            [
                                {
                                    text: "OK",
                                    style: 'cancel'
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
            });
    }

    function deleteCalendar() {
        fetch('http://' + ip + ':8080/calendars/' + calendar.id, {
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
                        "Xóa lịch hoạt thành công!",
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

    function checkTime() {
        return ((timeS.localeCompare(timeE) < 0))
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

            {(showDatePicker1 && editable) && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={datetime}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || datetime;
                        setShowDatePicker1(false);
                        setDatetime(currentDate);
                        tmp = showDate(currentDate);
                        setDate(tmp);
                    }}
                />
            )} 

            {(showDatePicker2 && editable) && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={datetime}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || datetime;
                        setShowDatePicker2(false);
                        setDatetime(currentDate);
                        tmp = showTime(currentDate);
                        setTimeS(tmp);
                    }}
                />
            )} 

            {(showDatePicker3 && editable) && (
                <DateTimePicker
                    testID="dateTimePicker"
                    timeZoneOffsetInMinutes={0}
                    value={datetime}
                    mode={'time'}
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || datetime;
                        setShowDatePicker3(false);
                        setDatetime(currentDate);
                        tmp = showTime(currentDate);
                        setTimeE(tmp);
                    }}
                />
            )} 

            <View style={styles.subContainer}>
                <Text style={styles.label}>Dịch vụ</Text>
                <Text style={styles.txtInfo}>{calendar.clinicServiceName}</Text>
            </View>

            <TouchableOpacity
                onPress={() =>{
                    if(editable) setShowDatePicker1(true);
                }}
            >
                <View style={[styles.subContainer, {backgroundColor: editable ? '#b0e0e6' : 'white'}]}>
                    <Text style={styles.label}>Ngày</Text>
                    <Text style={styles.txtInfo}>{date}</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={() =>{
                    if(editable) setShowDatePicker2(true);
                }}
            >
                <View style={[styles.subContainer, {backgroundColor: editable ? '#b0e0e6' : 'white'}]}>
                    <Text style={styles.label}>Thời gian bắt đầu</Text>
                    <Text style={styles.txtInfo}>{timeS}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() =>{
                    if(editable) setShowDatePicker3(true);
                }}
            >
                <View style={[styles.subContainer, {backgroundColor: editable ? '#b0e0e6' : 'white'}]}>
                    <Text style={styles.label}>Thời gian kết thúc</Text>
                    <Text style={styles.txtInfo}>{timeE}</Text>
                </View>
            </TouchableOpacity>
                
            <View style={styles.subContainer}>
                <Text style={styles.label}>Phòng</Text>
                <Text style={styles.txtInfo}>{calendar.medicalStaffRoom}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.label}>Nhân viên y tế</Text>
                <Text style={styles.txtInfo}>{calendar.medicalStaffName}</Text>
            </View>

            <View style={[styles.subContainer, {backgroundColor: editable ? '#b0e0e6' : 'white'}]}>
                <Text style={styles.label}>Trạng thái</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.txtInfo}>{stateList.get(state)}</Text>
                    {editable &&
                    <Picker
                        selectedValue={state}
                        style={{width: 40, height: 30}}
                        itemStyle={{fontSize: 18, fontWeight:'bold', color: 'blue'}}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                setState(itemValue);
                            }
                        }
                    >
                        <Picker.Item label="Chưa đặt" value={0} />
                        <Picker.Item label="Đã đặt" value={1} />
                    </Picker>
                    } 
                </View>
            </View>

            {(calendar.state === 0) ?
                (!editable ?
                <View style={[styles.btnContainer, {flexDirection: 'row'}]}>
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 80}]}
                        onPress={() => setEditable(true)} 
                    >
                        <Text style={styles.btnText}>Sửa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: 'red'}]}
                        onPress={() => {
                            Alert.alert(
                                "Thông báo",
                                "Bạn có chắc chắn muốn xóa lịch hoạt động này?",
                                [
                                    {
                                        text: "Có",
                                        onPress: () => {
                                            setLoading(true);
                                            deleteCalendar();
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
                :
                <View style={[styles.btnContainer, {flexDirection: 'row'}]}>
                    <TouchableOpacity 
                        style={[styles.button, {marginRight: 80, backgroundColor: 'red'}]}
                        onPress={() => {
                            setEditable(false);
                            setDate(changeDateFormat(calendar.date, 1));
                            setTimeE(changeTimeFormat(calendar.timeEnd));
                            setTimeS(changeTimeFormat(calendar.timeStart));
                        }} 
                    >
                        <Text style={styles.btnText}>Hủy</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.button, {backgroundColor: 'green'}]}
                        onPress={() => {
                            if (checkTime())
                                updateCalendar();
                            else {
                                Alert.alert(
                                    "Thông báo",
                                    "Thời gian kết thúc phải sau thời gian bắt đầu!",
                                    [
                                        {
                                            text: "OK",
                                            style: "cancel"
                                        }
                                    ]
                                )
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Lưu</Text>
                    </TouchableOpacity>
                </View>
                ) : <></>
            }       
        </ScrollView>
    );
}