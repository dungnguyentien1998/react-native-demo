import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Alert
} from 'react-native';
import {ip as ip} from './ipconfig.json';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ClientTabNavigator from './src/component/client/tabnavigator';
import AdminTabNavigator from './src/component/admin/admintabnavigator';
import MedicalTabNavigator from './src/component/medicalstaff/medicaltabnavigator';
import {styles as signinstyles} from './src/style/signin';
import {styles as signupstyles} from './src/style/signup';
export const AuthContext = React.createContext();
const Stack = createStackNavigator();

// -------------- Man hinh dang nhap --------------

function SignIn({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [checkUsername, setCheckUsername] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const {signIn} = React.useContext(AuthContext);

    logo = require('./src/icon/login/logo.png');

    function checkInput() {
        if (username.length * password.length === 0)
            return false;
        else
            return true;
    }

    return ( 
        <View style={signinstyles.container} accessible={false}>
            {isLoading &&
            <View style={[signinstyles.loading, {backgroundColor: 'rgba(192,192,192,0.7)'}]}></View>
            }
            {isLoading &&
            <View style={signinstyles.loading}>
                <ActivityIndicator size={100} color='#191970'/>
            </View>
            }

            <Image style={signinstyles.logo} source={logo}></Image>
            <TextInput
                onChangeText={(text) => {
                    setCheckUsername(true);
                    setUsername(text)
                }}
                underlineColorAndroid={(checkUsername && username.length === 0) ? 'red' : '#191970'}
                style={signinstyles.textInput}
                placeholder={'S??? ??i???n tho???i'}
                editable={!isLoading}
                ref={(input) => this.usrTextInput = input}
                onSubmitEditing={() => this.pwdTextInput.focus()}
                keyboardType='number-pad'
            />
            <TextInput
                onChangeText={(text) => {
                    setCheckPassword(true);
                    setPassword(text)
                }}
                underlineColorAndroid={(checkPassword && password.length === 0) ? 'red' : '#191970'}
                style={signinstyles.textInput}
                placeholder={'M???t kh???u'}
                secureTextEntry={true}
                editable={!isLoading}
                ref={(input) => this.pwdTextInput = input}
            />
            <TouchableOpacity
                onPress={async () => {
                    if (!checkInput()) {
                        setCheckPassword(true);
                        setCheckUsername(true);
                        Alert.alert(
                            "Th??ng b??o",
                            "B???n ph???i nh???p ????? t??n ????ng nh???p v?? m???t kh???u!",
                            [
                                {
                                    text: "OK",
                                    onPress: () => {
                                        if (username.length === 0) {
                                            this.usrTextInput.focus();
                                        } else if (password.length === 0) {
                                            this.pwdTextInput.focus();
                                        }
                                    }
                                }
                            ]
                        );
                    } else {
                        setLoading(true);
                        result = await signIn(username, password);
                        setLoading(false);
                        if (result === 1)
                            Alert.alert(
                                "Th??ng b??o",
                                "L???i k???t n???i!",
                                [
                                    {
                                        text: "OK",
                                        style: "cancel"
                                    }
                                ]
                            );
                        else if (result === 0)
                            Alert.alert(
                                "Th??ng b??o",
                                "T??n ????ng nh???p ho???c m???t kh???u kh??ng ????ng!",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => this.usrTextInput.focus()
                                    }
                                ]
                            );
                    }
                }} 
                style={signinstyles.btnLogin}
                disabled={isLoading}
            >
                <Text style={signinstyles.text}>????NG NH???P</Text>
            </TouchableOpacity>

            <View style={signinstyles.containerOR}>
                <View style={signinstyles.line}></View>
                <Text style={signinstyles.textOR}>HO???C</Text>
                <View style={signinstyles.line}></View>
            </View>
            <TouchableOpacity
                style={signinstyles.btnSignUp}
                onPress={() => navigation.navigate('SignUp')}
                disabled={isLoading}
            >
                <Text style={signinstyles.text}>????NG K?? T??I KHO???N</Text>
            </TouchableOpacity>
        </View>
    );
}

// -------------- Man hinh dang ky --------------

function SignUp({navigation}) {
    const [name, setName] = useState('');
    const [checkName, setCheckName] = useState(false);
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState(false);
    const [phone, setPhone] = useState('');
    const [checkPhone, setCheckPhone] = useState(false);
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const [submitPwd, setSubmitPwd] = useState('');
    const [checkSubmitPwd, setCheckSubmitPwd] = useState(false);
    const {signIn} = React.useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);

    function signUp() {
        setLoading(true);
        fetch('http://'+ ip + ':8080/sign-up', {
            method: 'POST',
            headers: {
                Accept: '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                username: phone,
                password: password,
                email: email,
                role: "USER"
            })
        })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    setLoading(false);
                    Alert.alert(
                        "Th??ng b??o",
                        "????ng k?? th??nh c??ng!",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    signIn(phone, password);
                                }
                            }
                        ]
                    );
                }
                else {
                    setLoading(false);
                    Alert.alert(
                        "Th??ng b??o",
                        "S??? ??i???n tho???i ???? ???????c ????ng k??!",
                        [
                            {
                                text: "OK",
                                onPress: () => {
                                    this.phoneInput.focus();
                                }
                            }
                        ]
                    );
                }
            })
            .catch((error) => {
                setLoading(false);
                Alert.alert(
                    "Th??ng b??o",
                    "???? x???y ra l???i!",
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

    function checkPhoneFormat() {
        const regex = RegExp(/(0[0-9])+([0-9]{8})\b/);
        return regex.test(phone);
    }

    function checkPasswordFormat() {
        const regex = RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
        return regex.test(password); 
    }
    function checkSubmitPwdFormat() {
        return ((password === submitPwd) && (submitPwd.length != 0));
    }

    function checkInput() {
        if (checkNameFormat() && checkEmailFormat() && checkPhoneFormat() && checkPasswordFormat()
            && checkSubmitPwdFormat())
            return true;
        else {
            setCheckName(true);
            setCheckEmail(true);
            setCheckPhone(true);
            setCheckPassword(true);
            setCheckSubmitPwd(true);
            return false;
        }
    }

    function errorNotice() {
        if ((name.length === 0) || (email.length === 0) || (phone.length === 0) 
            || (password.length === 0) || (submitPwd.length === 0)) {
                Alert.alert(
                    "Th??ng b??o",
                    "B???n ph???i nh???p ?????y ????? c??c th??ng tin!",
                    [
                        {
                            text: "OK",
                            onPress: () => {
                                if (name.length === 0) {
                                    this.nameInput.focus();
                                } else if (email.length === 0) {
                                    this.emailInput.focus();
                                } else if (phone.length === 0) {
                                    this.phoneInput.focus();
                                } else if (password.length === 0) {
                                    this.pwdInput.focus();
                                } else {
                                    this.submitPwdInput.focus();
                                }
                            }
                        }
                    ]
                );
        } else if (!checkPhoneFormat()) {
            Alert.alert(
                "Th??ng b??o",
                "S??? ??i???n tho???i kh??ng h???p l???!",
                [
                    {
                        text: "OK",
                        onPress: () => this.phoneInput.focus()
                    }
                ]
            );
        }else if (!checkEmailFormat()) {
            Alert.alert(
                "Th??ng b??o",
                "Email kh??ng h???p l???!",
                [
                    {
                        text: "OK",
                        onPress: () => this.emailInput.focus()
                    }
                ]
            );
        }else if (!checkPasswordFormat()) {
            Alert.alert(
                "Th??ng b??o",
                "M???t kh???u kh??ng ????ng ?????nh d???ng!",
                [
                    {
                        text: "OK",
                        onPress: () => this.pwdInput.focus()
                    }
                ]
            );
        } else if (!checkSubmitPwdFormat()) {
            Alert.alert(
                "Th??ng b??o",
                "X??c nh???n m???t kh???u kh??ng kh???p!",
                [
                    {
                        text: "OK",
                        onPress: () => this.submitPwdInput.focus()
                    }
                ]
            );
        }
    }

    return (
        <ScrollView contentContainerStyle={signupstyles.container}>
            {isLoading &&
            <View style={[signinstyles.loading, {backgroundColor: 'rgba(192,192,192,0.7)'}]}></View>
            }
            {isLoading &&
            <View style={signinstyles.loading}>
                <ActivityIndicator size={100} color='#191970'/>
            </View>
            }

            <Text style={signupstyles.title}>????ng k??</Text>
            <TextInput
                onChangeText={(text) => {
                    setCheckName(true);
                    setName(text);
                }}
                underlineColorAndroid={(checkName && !checkNameFormat()) ? 'red' : '#191970'}
                style={signupstyles.textInput}
                placeholder={'H??? v?? t??n'}
                ref={(input) => this.nameInput = input}
                onSubmitEditing={() => this.emailInput.focus()}
            />
            <TextInput
                onChangeText={(text) => {
                    setCheckEmail(true);
                    setEmail(text.toLocaleLowerCase());
                }}
                underlineColorAndroid={(checkEmail && !checkEmailFormat()) ? 'red' : '#191970'}
                style={signupstyles.textInput}
                style={signupstyles.textInput}
                placeholder={'Email'}
                keyboardType='email-address'
                ref={(input) => this.emailInput = input}
                onSubmitEditing={() => this.phoneInput.focus()}
            />
            <TextInput
                onChangeText={(text) => {
                    setCheckPhone(true);
                    setPhone(text);
                }}
                underlineColorAndroid={(checkPhone && !checkPhoneFormat()) ? 'red' : '#191970'}
                style={signupstyles.textInput}
                placeholder={'S??? ??i???n tho???i'}
                keyboardType='number-pad'
                ref={(input) => this.phoneInput = input}
                onSubmitEditing={() => this.pwdInput.focus()}
            />
            <TextInput
                onChangeText={(text) => {
                    setCheckPassword(true);
                    setPassword(text);
                }}
                underlineColorAndroid={(checkPassword && !checkPasswordFormat()) ? 'red' : '#191970'}
                style={[signupstyles.textInput, {marginBottom: 5}]}
                placeholder={'M???t kh???u'}
                secureTextEntry={true}
                ref={(input) => this.pwdInput = input}
                onSubmitEditing={() => this.submitPwdInput.focus()}
            />
            <Text style={signupstyles.require}>M???t kh???u t???i thi???u 8 k?? t???, ??t nh???t 1 ch??? s??? v?? 1 ch??? c??i vi???t hoa.</Text>
            <TextInput
                onChangeText={(text) => {
                    setCheckSubmitPwd(true);
                    setSubmitPwd(text);
                }}
                underlineColorAndroid={(checkSubmitPwd && !checkSubmitPwdFormat()) ? 'red' : '#191970'}
                style={signupstyles.textInput}
                placeholder={'X??c nh???n m???t kh???u'}
                secureTextEntry={true}
                ref={(input) => this.submitPwdInput = input}
            />
            <TouchableOpacity
                style={signupstyles.btnSignup}
                onPress={() => {
                    if (checkInput())
                        signUp();
                    else
                        errorNotice();
                }}
            >
                <Text style={signupstyles.text}>????NG K??</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default function App({ navigation }) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        userId: action.userId,
                        userRole: action.role,
                        tokenType: action.tokenType,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {   
            userId: -1,
            isSignout: false,
            userToken: null,
            userRole: '',
            tokenType: ''
        }
    );

    const authContext = React.useMemo(
        () => ({
            signIn: async (username, password) => {
                let userToken, userId, tokenType, role;
                let result = 0;
                try {
                    let response = await fetch('http://'+ ip + ':8080/login', {
                        method: 'POST',
                        headers: {
                            Accept: '*/*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            username: username,
                            password: password
                        })
                    })
                    let json = await response.json();
                    userToken = await json.accessToken === undefined ? null : json.accessToken;
                    userId = await json.accessToken === undefined ? -1 : json.userId;
                    role = await json.accessToken === undefined ? '' : json.role;
                    tokenType = await json.accessToken === undefined ? '' : json.tokenType;
                    if (userToken != null) result = 2;
                } catch (e) {
                    userToken = null;
                    userId = -1;
                    userRole = '';
                    tokenType = '';
                    result = 1;
                }
                dispatch({ type: 'SIGN_IN', token: userToken, userId: userId, role: role, tokenType: tokenType });
                return result;
            },

            signOut: async () => dispatch({ type: 'SIGN_OUT' }),
        }),[]
    );

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
            
                    {state.userToken === null ? (
                    <>
                        <Stack.Screen 
                            name="SignIn" component={SignIn}
                            options = {{title: "????ng nh???p"}}
                        />
                        <Stack.Screen 
                            name="SignUp" component={SignUp}
                            options = {{title: "????ng k??"}}
                        />
                    </>
                    ) : ( 
                    state.userRole === 'ADMIN' ?
                    <Stack.Screen 
                        name="AdminTabNavigator" component={AdminTabNavigator}
                        options = {{title: "Trang ch???"}}
                        initialParams={{userId: state.userId, authorization: (state.tokenType + ' ' + state. userToken)}}
                    />
                    : (
                    state.userRole === 'USER' ?
                    <Stack.Screen 
                        name="ClientTabNavigator" component={ClientTabNavigator}
                        options = {{title: "Trang ch???"}}
                        initialParams={{userId: state.userId, authorization: (state.tokenType + ' ' + state. userToken)}}
                    />
                    :
                    <Stack.Screen 
                        name="ClientTabNavigator" component={MedicalTabNavigator}
                        options = {{title: "Trang ch???"}}
                        initialParams={{userId: state.userId, authorization: (state.tokenType + ' ' + state. userToken)}}
                    />
                    ))}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}