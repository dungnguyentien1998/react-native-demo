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
import styles from '../../style/accountcontroller';
import {Picker} from '@react-native-community/picker';
import {ip as ip} from '../../../ipconfig.json';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const screenHeight = Dimensions.get('window').height;

export default function AccountController({route, navigation}) {
    const {userId, authorization} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [selectRole, setSelectRole] = useState("USER");
    const [users, setUsers] = useState([]);
    const [noUser, setNoUser] = useState(false);

    const roleList = new Map([
        ["USER", "Khách hàng"],
        ["MEDIC", "Nhân viên y tế"],
        ["ADMIN", "Nhân viên quản lý"]
    ]);

    React.useEffect(
        () => navigation.addListener('focus', async () => {
            setLoading(true);
            await getUsersByRole();
        }), []);

    getUsersByRole = () => {
        setLoading(true);
        fetch('http://' + ip + ':8080/getUsersByRole?role=' + selectRole, {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    setUsers(json);
                    if (json.length === 0)
                        setNoUser(true);
                    else
                        setNoUser(false);
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

    return (
        <View style={styles.container}>
            <View style={[styles.dateBar, {justifyContent: 'flex-start'}]}>
                <Text style={{marginLeft: 30, color: '#191970', fontSize: 25, fontWeight: 'bold'}}>{roleList.get(selectRole)}</Text>
                <Picker
                    selectedValue={selectRole}
                    style={{width: 40, height: 30}}
                    onValueChange={async (itemValue, itemIndex) => {
                        await setSelectRole(itemValue);
                        getUsersByRole();
                    }}
                >
                    <Picker.Item fontWeight='bold' key="1" label="Khách hàng" value="USER" color='#191970'/>    
                    <Picker.Item fontWeight='bold' key="2" label="Nhân viên y tế" value="MEDIC" color='#191970'/>
                    <Picker.Item fontWeight='bold' key="3" label="Nhân viên quản lý" value="ADMIN" color='#191970'/>               
                </Picker>
            </View>

            <View style={styles.apptContainer}>
                {isLoading ? <ActivityIndicator size={100} color='#191970'/> :
                    (noUser ? <Text style={{color: '#191970', fontSize: 20}}>Không có tài khoản nào.</Text> :
                        <FlatList
                            style={{marginVertical: 5}}
                            data={users}
                            renderItem={({item}) => (
                                <TouchableOpacity style={[styles.item,{}]}
                                    onPress={() => navigation.navigate('AccountDetail', {selectRole: selectRole, user: item})}
                                >
                                        <View style={[styles.itemRow, {marginBottom: 5}]}>
                                            <FontAwesome5 name={'user'} color='#191970' size={25} style={{marginRight: 10}} solid/>
                                            <Text style={styles.txtList}>{item.name}</Text>
                                        </View>
                                        <View style={styles.itemRow}>
                                            <FontAwesome5 name={'phone'} color='#191970' size={25} style={{marginRight: 10}} solid/>
                                            <Text style={styles.txtList}>{item.username}</Text>
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
                        navigation.navigate('AddAccount', {selectRole: selectRole, authorization: authorization});
                    }} 
                    style={[styles.btnFind, {padding: 0}]}
                >
                    <Text style={styles.btnText}>Thêm tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}