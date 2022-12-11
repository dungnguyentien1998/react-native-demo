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
import {ip as ip} from '../../../ipconfig.json';
import styles from '../../style/addcalendar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-community/picker';

const screenHeight = Dimensions.get('window').height;

export default function AddCalendar({route, navigation}) {
    const {authorization, services} = route.params;
    const [datetime, setDatetime] = useState(new Date());
    const [showDatePicker1, setShowDatePicker1] = useState(false);
    const [date, setDate] = useState(showDate(datetime));
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [timeS, setTimeS] = useState(showTime(datetime));
    const [showDatePicker3, setShowDatePicker3] = useState(false);
    const [timeE, setTimeE] = useState(showTime(datetime));
    const [isLoading, setLoading] = useState(true);
    const [serviceList, setServiceList] = useState(new Map());
    const [selectService, setSelectService] = useState();
    const [medicStaff, setMedicStaff] = useState([]);
    const [selectStaff, setSelectStaff] = useState('');
    const [staffList, setStaffList] = useState(new Map());

    React.useEffect( () => {
        getMedicStaff();
        for (var i = 0; i < services.length; i++) {
            setServiceList(serviceList.set(services[i].id.toString(), services[i].name));
        }
        setSelectService(services[0].id.toString());
    }, []);

    function createCalendar() {
        setLoading(true);
        fetch('http://' + ip + ':8080/calendars?clinicServiceId=' + selectService + '&medicalStaffId=' + selectStaff, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                },
                body: JSON.stringify({
                    date: changeDateFormat(date, 0),
                    timeStart: changeTimeFormat(timeS),
                    timeEnd: changeTimeFormat(timeE),
                    state: 0
                })
            })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    Alert.alert(
                        "Thông báo",
                        "Thêm lịch hoạt động thành công!",
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
                        if (medicStaff.length === 0) {
                            Alert.alert(
                                "Thông báo",
                                "Chưa có nhân viên y tế!",
                                [
                                    {
                                        text: "OK",
                                        style: 'cancel'
                                    }
                                ]
                            );
                        }
                        else {
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
                        }
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

    function getMedicStaff() {
        setLoading(true);
        fetch('http://' + ip + ':8080/getUsersByRole?role=MEDIC', {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    setMedicStaff(json);
                    setSelectStaff(json[0].id.toString());
                    for (var i = 0; i < json.length; i++) {
                        setStaffList(staffList.set(json[i].id.toString(), json[i].name));
                    }
                })
                .catch((error) => 
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
                )
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

    function renderPickerItem() {
        var items = [];
        for (var i = 0; i < services.length; i++) {
            items.push(
                <Picker.Item fontWeight='bold' key={services[i].id.toString()} label={services[i].name}
                    value={services[i].id.toString()} color='#191970'
                />
            )
        }
        return items;
    }

    function renderStaffItem() {
        var items = [];
        for (var i = 0; i < medicStaff.length; i++) {
            items.push(
                <Picker.Item fontWeight='bold' key={medicStaff[i].id.toString()} label={medicStaff[i].name}
                    value={medicStaff[i].id.toString()} color='#191970'
                />
            )
        }
        return items;
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

            {showDatePicker1 && (
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

            {showDatePicker2 && (
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

            {showDatePicker3 && (
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
            <View style={styles.serviceBar}>
                <Text style={{marginLeft: 30, color: '#191970', fontSize: 25, fontWeight: 'bold'}}>{serviceList.get(selectService)}</Text>
                <Picker
                    selectedValue={selectService}
                    style={{width: 40, height: 30}}
                    onValueChange={async (itemValue, itemIndex) => {
                        setSelectService(itemValue);
                    }}
                >
                    {renderPickerItem()}                
                </Picker>
            </View>
            
                
            <View style={styles.subContainer}>
                <Text style={styles.label}>Ngày</Text>
                <Text style={styles.txtInfo} onPress={() => setShowDatePicker1(true)}>{date}</Text>
            </View>
                
            <View style={styles.subContainer}>
                <Text style={styles.label}>Thời gian bắt đầu</Text>
                <Text style={styles.txtInfo} onPress={() => setShowDatePicker2(true)}>{timeS}</Text>
            </View>

            <View style={styles.subContainer}>
                <Text style={styles.label}>Thời gian kết thúc</Text>
                <Text style={styles.txtInfo} onPress={() => setShowDatePicker3(true)}>{timeE}</Text>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.label}>Nhân viên y tế</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.txtInfo}>{staffList.get(selectStaff)}</Text>
                    <Picker
                        selectedValue={selectStaff}
                        style={{width: 40, height: 30}}
                        onValueChange={async (itemValue, itemIndex) => {
                            await setSelectStaff(itemValue);
                        }}
                    >
                        {renderStaffItem()}                
                    </Picker> 
                </View>
                
            </View>
            
            <View style={[styles.btnContainer, {flexDirection: 'row'}]}>
                <TouchableOpacity 
                    style={[styles.button, {marginRight: 80}]}
                    onPress={() => {
                        if (checkTime()) {
                            createCalendar();
                        } else {
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
                    <Text style={styles.btnText}>Thêm</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'red'}]}
                    onPress={() => {
                        Alert.alert(
                            "Thông báo",
                            "Bạn có chắc chắn muốn hủy thao tác này?",
                            [
                                {
                                    text: "Có",
                                    onPress: () => {
                                        navigation.pop(1);
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
                    <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>
            </View>
                
        </ScrollView>
    );
}