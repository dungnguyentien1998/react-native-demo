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
import {ip as ip} from '../../../ipconfig.json';
import {Picker} from '@react-native-community/picker';
import styles from '../../style/personalinformation';
import {AuthContext} from '../../../App';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function PersonalInformation({route, navigation}) {
    const {userId, authorization} = route.params;
    const [user, setUser] = useState({});
    const [accountImg, setAccountImg] = useState(require('../../image/personalinformation/account.png'));
    const [editableInfo, setEditableInfo] = useState(false);
    const [name, setName] = useState("");
    const [checkName, setCheckName] = useState(false);
    const [gender, setGender] = useState("Nam");
    const [dateOfBirth, setDateOfBirth] = useState("yyyy-mm-dd");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [checkEmail, setCheckEmail] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [datetime, setDatetime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const {signOut} = React.useContext(AuthContext);

    React.useEffect(() => {
        setLoading(true);
        getInfo();
    }, []);

    function getInfo() {
        fetch('http://'+ ip + ':8080/users/' + userId, {
            method: 'GET',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
                Authorization: authorization
            }
        })
            .then((response) => response.json())
            .then(async (json) => {
                setName(json.name);
                if (json.gender != null) setGender(json.gender);
                if (json.dateOfBirth != null) setDateOfBirth(json.dateOfBirth);
                if (json.address != null) setAddress(json.address);
                if (json.country != null) setCountry(json.country);
                setPhone(json.username);
                setEmail(json.email);                
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

    function updateInfo() {
        setLoading(true);
        fetch('http://'+ ip + ':8080/users/' + userId, {
                method: 'PUT',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                },
                body: JSON.stringify({
                    name: name,
                    address: address,
                    country: country,
                    email: email,
                    dateOfBirth: dateOfBirth,
                    gender: gender
                })
            })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    Alert.alert(
                        "Thông báo",
                        "Cập nhật thông tin thành công!",
                        [
                            {
                                text: "OK",
                                onPress:  () => {
                                    setLoading(true);
                                    getInfo();
                                }
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
            });
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

    function showDate(selectTime) {
        d = selectTime.getDate();
        m = selectTime.getMonth() + 1;
        y = selectTime.getFullYear();
        tmp = y + '-' + ((m > 9) ? m : '0' + m) + '-' + ((d > 9) ? d : '0' + d);
        return tmp;
    }

    const onChange = async (event, selectedDate) => {
        const currentDate = await selectedDate || datetime;
        setShowDatePicker(false);
        setDatetime(currentDate);
        tmp = await showDate(currentDate);
        await setDateOfBirth(tmp);
    };

    function checkNameFormat () {
        if (name.length === 0) 
            return false;
        else 
            return true;
    }

    function checkEmailFormat() {
        const regex = RegExp(/^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/);
        return regex.test(email); 
    }

    function checkInput() {
        if (checkNameFormat() && checkEmailFormat())
            return true;
        else {
            setCheckName(true);
            setCheckEmail(true);
            return false;
        }
    }

    function errorNotice() {
        if ((name.length === 0)) {
                Alert.alert(
                    "Thông báo",
                    "Bạn phải nhập họ tên!",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                this.nameInput.focus();
                            }
                        }
                    ]
                );
        } else if ((email.length === 0)) {
            Alert.alert(
                "Thông báo",
                "Bạn phải nhập email!",
                [
                    {
                        text: "OK",
                        onPress: () => {
                            this.emailInput.focus();
                        }
                    }
                ]
            );
        } else if (!checkEmailFormat()) {
            Alert.alert(
                "Thông báo",
                "Email không hợp lệ!",
                [
                    {
                        text: "OK",
                        onPress: () => this.emailInput.focus()
                    }
                ]
            );
        }
    }

    return (
        isLoading ? <ActivityIndicator style={styles.loading} size={100} color='#191970'/> :
        <ScrollView style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image style={{width: 80, height: 80, margin: 10}} source={accountImg}/>
                <Text style={{fontSize: 18}}>Ảnh đại diện</Text>
                <Text style={{fontSize: 18, color: 'blue', marginLeft: 100}}>Thay đổi</Text>
            </View>

            {(showDatePicker && editableInfo) && (
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

            <View style={styles.infoContainer}>

                <Text style={styles.label}>Họ tên</Text>
                <TextInput style={styles.txtInfo} value={name} editable={editableInfo} 
                    onChangeText={(text) => setName(text)}
                    ref={(input) => this.nameInput = input}/>
                <View style={[styles.line, {backgroundColor: (checkName && !checkNameFormat()) ? 'red' : '#dcdcdc'}]}></View>
                
                <Text style={styles.label}>Giới tính</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={[styles.txtInfo, {width: 50}]}>{gender}</Text>
                    { editableInfo &&
                    <Picker
                        selectedValue={gender}
                        style={{width: 40, height: 30}}
                        itemStyle={{fontSize: 18, fontWeight:'bold', color: 'blue'}}
                        onValueChange={(itemValue, itemIndex) =>
                            {
                                setGender(itemValue);
                            }
                        }
                    >
                        <Picker.Item label="Nam" value="Nam" />
                        <Picker.Item label="Nữ" value="Nữ" />
                        <Picker.Item label="Khác" value="Khác" />
                    </Picker>
                    } 
                </View>
                <View style={styles.line}></View>

                <Text style={styles.label}>Ngày sinh</Text>
                <Text style={styles.txtInfo} 
                    onPress={() => {
                        if (editableInfo) setShowDatePicker(true);
                    }}
                >
                    {changeDateFormat(dateOfBirth, 1)}
                </Text>
                <View style={styles.line}></View>

                <Text style={styles.label}>Địa chỉ</Text>
                <TextInput style={styles.txtInfo} value={address} editable={editableInfo} onChangeText={(text) => setAddress(text)}/>
                <View style={styles.line}></View>

                <Text style={styles.label}>Quốc tịch</Text>
                <TextInput style={styles.txtInfo} value={country} editable={editableInfo} onChangeText={(text) => setCountry(text)}/>
                <View style={styles.line}></View>

                <Text style={styles.label}>Số điện thoại</Text>
                <Text style={styles.txtInfo}>{phone}</Text>
                <View style={styles.line}></View>

                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.txtInfo} value={email} editable={editableInfo} 
                    onChangeText={(text) => setEmail(text)}
                    ref={(input) => this.emailInput = input}/>
                <View style={[styles.line, {backgroundColor: (checkEmail && !checkEmailFormat()) ? 'red' : '#dcdcdc'}]}></View>
            </View>
            {!editableInfo ?
            <>
            <TouchableOpacity style={styles.btnContainer} onPress={() => setEditableInfo(true)}>
                    <Text style={styles.btnText}>Chỉnh sửa</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnContainer, {marginBottom: 10}]} onPress={() => signOut()}>
                <Text style={styles.btnText}>Đăng xuất</Text>
            </TouchableOpacity>
            </>
            :
            <>
            <TouchableOpacity style={[styles.btnContainer, {backgroundColor: '#98fb98'}]} 
                onPress={() => {
                    if (checkInput()) {
                        setEditableInfo(false);
                        updateInfo();
                    }
                    else
                        errorNotice();
                    
                }}>
                    <Text style={styles.btnText}>Lưu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnContainer, {backgroundColor: '#f08080', marginBottom: 10}]} 
                onPress={() => {
                    setEditableInfo(false);
                    setLoading(true);
                    getInfo();
                }}>
                <Text style={styles.btnText}>Hủy</Text>
            </TouchableOpacity>
            </>
            }
        </ScrollView>
    );
}