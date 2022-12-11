import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';
import PersonalInformation from '../client/personalinformation';
import ViewAppointment from './viewappointment';
import AppointmentDetail from './appointmentdetail';

const Tab = createBottomTabNavigator(); 
const HomeStack = createStackNavigator(); 
const ViewAppointmentStack = createStackNavigator();
const AccountStack = createStackNavigator();

function HomeScreen({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{title: "Trang chủ"}} 
                initialParams={{userId: userId, authorization: authorization}}/>
        </HomeStack.Navigator>
    );
}

function AppointmentScreen({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <ViewAppointmentStack.Navigator>
            <ViewAppointmentStack.Screen name="ViewAppointment" component={ViewAppointment} options={{title: "Lịch làm việc"}}
                initialParams={{userId: userId, authorization: authorization}}/>
            <ViewAppointmentStack.Screen name="AppointmentDetail" component={AppointmentDetail} options={{title: "Chi tiết lịch hẹn"}}/>
        </ViewAppointmentStack.Navigator>
    );
}

function AccountScreen({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen name="PersonalInformation" component={PersonalInformation} options={{title: "Thông tin cá nhân"}}
                initialParams={{userId: userId, authorization: authorization}}/>
        </AccountStack.Navigator>
    );
}

export default function MedicalTabNavigator({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Trang chủ') {
                        iconName = 'home';
                    } else if (route.name === 'Lịch làm việc') {
                        iconName = 'calendar';
                    } else if (route.name === 'Tài khoản') {
                        iconName = 'user-circle';
                    }
                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: '#191970',
                inactiveTintColor: 'gray',
                keyboardHidesTabBar: true,
            }}
        >
            <Tab.Screen name="Trang chủ" component={HomeScreen} initialParams={{userId: userId, authorization: authorization}}/>
            <Tab.Screen name="Lịch làm việc" component={AppointmentScreen} initialParams={{userId: userId, authorization: authorization}}/>
            <Tab.Screen name="Tài khoản" component={AccountScreen} initialParams={{userId: userId, authorization: authorization}}/>
        </Tab.Navigator>
    );
}