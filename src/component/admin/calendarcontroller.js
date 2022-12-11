import React, {useState} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Alert,
    Dimensions,
} from 'react-native';
import styles from '../../style/appointmentcontroller';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Picker} from '@react-native-community/picker';
import {ip as ip} from '../../../ipconfig.json';

const screenHeight = Dimensions.get('window').height;

export default function CalendarController({route, navigation}) {
    const {userId, authorization} = route.params;
    const [datetime, setDatetime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [date, setDate] = useState(showDate(datetime));
    const [isLoading, setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [cals, setCals] = useState([]); 
    const [noCal, setNoCal] = useState(true);
    const [selectService, setSelectService] = useState('');
    const [serviceList, setServiceList] = useState(new Map());

    React.useEffect(
        () => navigation.addListener('focus', async () => {
            setCals([]);
            setNoCal(true);
            setLoading(true);
            await getService();
        }), []);

    getCal = async () => {
        var d = await date;
        setLoading(true);
        fetch('http://' + ip + ':8080/getCalendarsByClinicServiceAndDate?id=' + selectService + '&date=' + changeDateFormat(d, 0), {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: authorization
            }
        })
            .then((response) => response.status === 204 ? [] : response.json())
            .then((json) => {
                if (json.length === 0) 
                    setNoCal(true);
                else
                    setNoCal(false);
                setCals(json);
                return json;
            })
            .catch((error) => {
                setNoCal(true);
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

    getService = () => {
        setLoading(true);
        fetch('http://' + ip + ':8080/clinicservices', {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    setServices(json);
                    setSelectService(json[0].id.toString());
                    for (var i = 0; i < json.length; i++) {
                        setServiceList(serviceList.set(json[i].id.toString(), json[i].name));
                    }
                    return json;
                })
                .then(async (json) => {
                    if (json.length === 0) {
                        Alert.alert(
                            "Thông báo",
                            "Chưa có dịch vụ",
                            [
                                {
                                    text: "OK",
                                    style: "cancel"
                                }
                            ]
                        );
                    } else {
                        await getCal();
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
        if (services.length === 0) {
            Alert.alert(
                "Thông báo",
                "Chưa có dịch vụ",
                [
                    {
                        text: "OK",
                        style: "cancel"
                    }
                ]
            );
        } else {
            await getCal();
        }
    };

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

    return (
        <View style={styles.container}>
            <View style={[styles.dateBar, {justifyContent: 'flex-start'}]}>
                <Text style={{marginLeft: 30, color: '#191970', fontSize: 25, fontWeight: 'bold'}}>{serviceList.get(selectService)}</Text>
                <Picker
                    selectedValue={selectService}
                    style={{width: 40, height: 30}}
                    onValueChange={async (itemValue, itemIndex) => {
                        await setSelectService(itemValue);
                        if (services.length === 0) {
                            Alert.alert(
                                "Thông báo",
                                "Chưa có dịch vụ",
                                [
                                    {
                                        text: "OK",
                                        style: "cancel"
                                    }
                                ]
                            );
                        } else {
                            await getCal();
                        }
                    }}
                >
                    {renderPickerItem()}                
                </Picker>
            </View>

            <View style={styles.dateBar}>
                <TouchableOpacity>
                    <AntDesign
                        name='caretleft' size={35} color='#191970'
                        onPress={async () =>{
                            await datetime.setDate(datetime.getDate() - 1);
                            await setDate(showDate(datetime));
                            if (services.length === 0) {
                                Alert.alert(
                                    "Thông báo",
                                    "Chưa có dịch vụ",
                                    [
                                        {
                                            text: "OK",
                                            style: "cancel"
                                        }
                                    ]
                                );
                            } else {
                                await getCal();
                            }
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
                            if (services.length === 0) {
                                Alert.alert(
                                    "Thông báo",
                                    "Chưa có dịch vụ",
                                    [
                                        {
                                            text: "OK",
                                            style: "cancel"
                                        }
                                    ]
                                );
                            } else {
                                await getCal();
                            }
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

            <View style={[styles.apptContainer, {height: Math.round(screenHeight*0.5)}]}>
                {isLoading ? <ActivityIndicator size={100} color='#191970'/> :
                    (noCal ? <Text style={{color: '#191970', fontSize: 20}}>Không có lịch hoạt động nào.</Text> :
                        <FlatList
                            style={{marginVertical: 5}}
                            data={cals}
                            renderItem={({item}) => (
                                <TouchableOpacity style={[styles.item,{backgroundColor: (item.state ? '#90ee90' : '#e6e6fa')}]}
                                    onPress={() => navigation.navigate('CalendarDetail', {authorization: authorization, calendar: item})}
                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <View style={styles.itemRow}>
                                            <FontAwesome5 name={'medkit'} color='#191970' size={25} solid/>
                                            <Text style={styles.txtList}>{item.clinicServiceName}</Text>
                                        </View>
                                        <View style={styles.itemRow}>
                                            <FontAwesome5 name={'clinic-medical'} color='#191970' size={25} solid/>
                                            <Text style={styles.txtList}>{item.medicalStaffRoom}</Text>
                                        </View>
                                    </View>

                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                            <View style={styles.itemRow}>
                                                <FontAwesome5 name={'clock'} color='#191970' size={25} solid/>
                                                <Text style={styles.txtList}>{changeTimeFormat(item.timeStart)}</Text>
                                            </View>

                                            <View style={styles.itemRow}>
                                                <FontAwesome5 style={{marginHorizontal: 3}} name={'calendar-alt'} color='#191970' size={25} solid/>    
                                                <Text style={styles.txtList}>{changeDateFormat(item.date, 1)}</Text>
                                            </View>
                                        </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    )
                }
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity 
                    onPress={() => {
                        if (services.length > 0)
                            navigation.navigate('AddCalendar', {authorization: authorization, services: services});
                    }} 
                    style={[styles.btnFind, {padding: 0}]}
                >
                    <Text style={styles.btnText}>Thêm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}