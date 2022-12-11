import React, {useState, useEffect, createFactory} from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    FlatList,
} from 'react-native';
import styles from '../../style/selectservice';
import {ip as ip} from '../../../ipconfig.json';

export default function SelectService({route, navigation}) {
    const {userId, authorization} = route.params;
    const eyeIcon = require('../../icon/selectservice/eye.png');
    const earIcon = require('../../icon/selectservice/ear.png');
    const teethIcon = require('../../icon/selectservice/teeth.png');
    const skinIcon = require('../../icon/selectservice/skin.png');
    const [services, setServices] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(
        () => navigation.addListener('focus', () => {
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
            .then((json) => setServices(json))
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
        })
    ,[]);

    function setIcon(name) {
        switch (name) {
            case 'Khám mắt':
                return eyeIcon;
            case 'Khám da liễu':
                return skinIcon;
            case 'Khám tai mũi họng':
                return earIcon;
            case 'Khám răng':
                return teethIcon;
            default:
                return eyeIcon;
        }
    }
    
    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size={100} color='#191970'/> : (
                <View style={styles.container}>
                    <View style={{flex: 0.8}}>
                        <FlatList
                            data={services}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    style={styles.service} 
                                    onPress={() => navigation.navigate('ServiceDetail', 
                                            {service: item, userId: userId, authorization: authorization})}
                                >
                                    <Image style={styles.icon} source={setIcon(item.name)}/>
                                    <Text style={styles.serviceName}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>

                    <View style={styles.textContainer}>
                        <View style={styles.line}></View>
                        <Text style={styles.text}>BẠN CHƯA CHỌN ĐƯỢC DỊCH VỤ?</Text>
                        <View style={styles.line}></View>
                    </View>

                    <View style={styles.btnContainer}>
                            <TouchableOpacity>
                            <Text style={styles.btnSurvey}>KHẢO SÁT SỨC KHỎE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}