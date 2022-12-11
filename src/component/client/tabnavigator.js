import React from 'react';
import { 
    Text, 
    View,
    Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './home';
import SelectService from './selectservice';
import ServiceDetail from './servicedetail';
import MakeAppointment from './makeappointment';
import SubmitAppointment from './submitappointment';
import ViewAppointment from './viewappointment';
import AppointmentDetail from './appointmentdetail';
import PersonalInformation from './personalinformation';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator(); 
const CreateCalendarStack = createStackNavigator();
const ViewCalendarStack = createStackNavigator();
const AccountStack = createStackNavigator();

function HomeScreen({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} options={{title: "Trang chủ"}} initialParams={{userId: userId, authorization: authorization}}/>
        </HomeStack.Navigator>
    );
}

function CreateCalendarScreen({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <CreateCalendarStack.Navigator>
            <CreateCalendarStack.Screen name="SelectService" component={SelectService} options={{title: "Chọn dịch vụ"}} initialParams={{userId: userId, authorization: authorization}}/>
            <CreateCalendarStack.Screen name="ServiceDetail" component={ServiceDetail} options={{title: "Chi tiết dịch vụ"}}/>
            <CreateCalendarStack.Screen name="MakeAppointment" component={MakeAppointment} options={{title: "Tạo lịch hẹn"}}/>
            <CreateCalendarStack.Screen name="SubmitAppointment" component={SubmitAppointment} options={{title: "Chi tiết lịch hẹn"}}/>
        </CreateCalendarStack.Navigator>
    );
}

function ViewCalendarScreen({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <ViewCalendarStack.Navigator>
            <ViewCalendarStack.Screen name="ViewAppointment" component={ViewAppointment} options={{title: "Lịch hẹn của bạn"}} initialParams={{userId: userId, authorization: authorization}}/>
            <ViewCalendarStack.Screen name="AppointmentDetail" component={AppointmentDetail} options={{title: "Chi tiết lịch hẹn"}}/>
        </ViewCalendarStack.Navigator>
  );
}
function AccountScreen({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen name="PersonalInformation" component={PersonalInformation} options={{title: "Thông tin cá nhân"}} initialParams={{userId: userId, authorization: authorization}}/>
        </AccountStack.Navigator>
    );
}

export default function ClientTabNavigator({route, navigation}) {
    const {userId, authorization} = route.params;
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Trang chủ') {
                        iconName = 'home';
                    } else if (route.name === 'Tạo lịch hẹn') {
                        iconName = 'calendar-plus-o';
                    } else if (route.name === 'Xem lịch hẹn') {
                        iconName = 'calendar-check-o';
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
            <Tab.Screen name="Tạo lịch hẹn" component={CreateCalendarScreen} initialParams={{userId: userId, authorization: authorization}}/>
            <Tab.Screen name="Xem lịch hẹn" component={ViewCalendarScreen} initialParams={{userId: userId, authorization: authorization}}/>
            <Tab.Screen name="Tài khoản" component={AccountScreen} initialParams={{userId: userId, authorization: authorization}}/>
        </Tab.Navigator>
    );
}