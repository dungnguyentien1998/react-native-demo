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
import styles from '../../style/adminservicedetail';
import {ip as ip} from '../../../ipconfig.json';

const screenHeight = Dimensions.get('window').height;

export default function AddService({route, navigation}) {
    const {authorization} = route.params;
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [isLoading, setLoading] = useState(false);

    function createService() {
        setLoading(true);
        fetch('http://' + ip + ':8080/clinicservices', {
                method: 'POST',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                },
                body: JSON.stringify({
                    name: name,
                    description: des
                })
            })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    Alert.alert(
                        "Thông báo",
                        "Thêm dịch vụ thành công!",
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

            <View style={styles.subContainer}>
                <Text style={styles.label}>Tên dịch vụ</Text>
                <TextInput style={styles.txtInfo} value={name} onChangeText={(text) => setName(text)}/>
            </View>
                
            <View style={styles.subContainer}>
                <Text style={styles.label}>Mô tả</Text>
                <TextInput style={[styles.txtInfo, {height: Math.round(screenHeight*0.4), textAlignVertical: 'top'}]} 
                    value={des} multiline={true} onChangeText={(text) => setDes(text)}/>
            </View>
            
            <View style={[styles.btnContainer, {flexDirection: 'row'}]}>
                <TouchableOpacity 
                    style={[styles.button, {marginRight: 80}]}
                    onPress={() => {
                        if (name.length === 0) {
                            Alert.alert(
                                "Thông báo",
                                "Bạn phải nhập tên dịch vụ!",
                                [
                                    {
                                        text: "OK",
                                        style: 'cancel'
                                    }
                                ]
                            )
                        } else
                            createService();
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