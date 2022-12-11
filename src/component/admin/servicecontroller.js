import React, {useState, useEffect} from 'react';
import {
    Text, 
    View,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity
} from 'react-native';
import {ip as ip} from '../../../ipconfig.json';
import styles from '../../style/servicecontroller';

export default function ServiceController({route, navigation}) {
    const {userId, authorization} = route.params;
    const [services, setServices] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(
        () => navigation.addListener('focus', () => {
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
        }), []);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator size={100} color='#191970'/> : 
                <View style={styles.container}>
                    <FlatList
                        style={styles.listContainer}
                        data={services}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => navigation.navigate('ServiceDetail', 
                                    {service: item, userId: userId, authorization: authorization})}
                            >
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.name}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                            )}
                        keyExtractor={item => item.id.toString()}
                    />

                    <View style={styles.btnContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('AddService', {authorization: authorization})}
                        >
                            <Text style={styles.btnText}>Thêm dịch vụ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    );
} 