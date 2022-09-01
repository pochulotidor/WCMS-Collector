import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../firebase/AuthProvider';

import { globalStyle } from '../../styles/GlobalStyles';
import Input from '../../components/InputField';
import Btn from '../../components/Buttons';

import * as Animatable from 'react-native-animatable';

import { Formik } from 'formik';
import * as yup from 'yup';



const Validator = yup.object().shape({
    email: yup.string()
        .required('This field is required.')
        .email('Invalid email form.'),

    password: yup.string()
        .required("This field is required.")
        .min(6, 'A minimum of 6 characters required.')
});


export default function Login({navigation}) {

    const userInfo = {
        email: '',
        password: ''
    }

    const { login } = useContext(AuthContext);

    return (


        <Formik
            initialValues={userInfo}
            validationSchema={Validator}
            onSubmit={values => {
                const { email, password } = values;
                login(email, password);
            }

            }
        >

            {({ values, handleChange, handleSubmit, errors }) => {

                console.log(values);
                const { email, password } = values;

                return (


                    <Animatable.View
                        style={globalStyle.globalContainer}
                        animation='fadeInUpBig'
                    >

                        <View style={globalStyle.globalContainer}>
                            <React.Fragment>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        style={globalStyle.loginLogo}
                                        source={require('../../assets/logoW.png')}
                                        resizeMode='stretch'
                                    />
                                    <Text style={globalStyle.Logintext}>
                                        Collector Login
                                    </Text>
                                </View>

                                <Input
                                    placeholder='Email'
                                    keyboardType='email-address'
                                    autoCapitalize='none'
                                    value={email}
                                    onChangeText={handleChange('email')}
                                />
                                <Text style={{ color: 'red', fontSize: 12 }}>
                                    {errors.email}
                                </Text>

                                <Input
                                    placeholder='Password'
                                    secureTextEntry={true}
                                    autoCapitalize='none'
                                    value={password}
                                    onChangeText={handleChange('password')}
                                />

                                <Text style={{ color: 'red', fontSize: 12 }}>
                                    {errors.password}
                                </Text>

                               
                                <TouchableOpacity>
                                        <Text
                                            style={{
                                                color: '#368547',
                                                fontSize: 15,
                                                borderBottomWidth: 1,
                                                borderBottomColor: '#368547',
                                                margin: 10
                                        }}
                                        onPress={() => navigation.navigate('ForgotPassword')}
                                        >
                                            Forgot password?
                                        </Text>
                                    </TouchableOpacity>

                                <Btn
                                    btnName='Login'
                                    onPress={handleSubmit}
                                />
                                
                                
                            </React.Fragment>

                        </View>



                    </Animatable.View>

                )
            }

            }
        </Formik>

    )
}
