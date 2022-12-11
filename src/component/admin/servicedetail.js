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

export default function ServiceDetail({route, navigation}) {
    const {service, userId, authorization} = route.params;
    const [currentService, setCurrentService] = useState(service);
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState(service.name);
    const [des, setDes] = useState(service.description);
    const [isLoading, setLoading] = useState(false);

    function updateService() {
        setLoading(true);
        fetch('http://' + ip + ':8080/clinicservices/' + service.id, {
                method: 'PUT',
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
                        "Cập nhật thành công!",
                        [
                            {
                                text: "OK",
                                onPress:  () => {
                                    setEditable(false);
                                    setCurrentService({
                                        name: name,
                                        description: des
                                    });
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

    function deleteService() {
        setLoading(true);
        fetch('http://' + ip + ':8080/clinicservices/' + service.id, {
                method: 'DELETE',
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    Authorization: authorization
                }
            })
            .then((response) => {
                setLoading(false);
                if (response.ok) {
                    Alert.alert(
                        "Thông báo",
                        "Xóa thành công!",
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
                <TextInput style={styles.txtInfo} value={name} editable={editable}
                    onChangeText={(text) => setName(text)}/>
            </View>
                
            <View style={styles.subContainer}>
                <Text style={styles.label}>Mô tả</Text>
                <TextInput style={[styles.txtInfo, {height: Math.round(screenHeight*0.4), textAlignVertical: 'top'}]} 
                    value={des} editable={editable} multiline={true}
                    onChangeText={(text) => setDes(text)}/>
            </View>
                
            { !editable ?
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
                            "Bạn có chắc chắn muốn xóa dịch vụ này?",
                            [
                                {
                                    text: "Có",
                                    onPress: () => {
                                        deleteService();
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
                        setName(currentService.name);
                        setDes(currentService.description);
                    }} 
                >
                    <Text style={styles.btnText}>Hủy</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, {backgroundColor: 'green'}]}
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
                            updateService();
                    }} 
                >
                    <Text style={styles.btnText}>Lưu</Text>
                </TouchableOpacity>
            </View>
            }       
        </ScrollView>
    );
}