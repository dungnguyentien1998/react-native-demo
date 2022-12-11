import React, {useState} from 'react';
import {
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import styles from '../../style/home';

export default function Home() {
    const [img, setImg] = useState(require('../../image/home/image1.jpg'));
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={img}/>
            </View>
            <View style={[styles.textContainer,{flex: 3}]}>
                <Text style={[styles.title, {marginTop: 10}]}>
                    Thông báo
                </Text>
                <ScrollView style={styles.content}>

                </ScrollView>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Các dịch vụ phòng khám
                </Text>
                <ScrollView style={styles.content}>
                    
                </ScrollView>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Quy trình khám bệnh tại phòng khám
                </Text>
                <ScrollView style={styles.content}>
                    
                </ScrollView>
            </View>
        </View>
    );
}