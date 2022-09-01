import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../firebase/AuthProvider';
import { globalStyles } from '../global/globalStyles';
import Icon from 'react-native-vector-icons//FontAwesome5';
import Data from '../components/data';

const { height, width } = Dimensions.get('screen');

export default function Profile({ navigation }) {
    const { logout } = useContext(AuthContext);
    const { uid } = auth().currentUser;
    const [user, setUser] = useState();

    const getUser = async () => {
        try {
            const documentSnapshot = await firestore()
                .collection('collectors')
                .doc(uid)
                .get();

            const userData = documentSnapshot.data();
            setUser(userData);
        } catch {
            //do whatever

        }
    };

    // Get user on mount
    useEffect(() => {
        getUser();
    }, []);




    return (
        <View
            style={styles.container}
        >
            <View
                style={globalStyles.profileHeader}
            >

                <View
                    style={{

                        alignItems: 'center'
                    }}
                >
                    
                    <Text
                        style={styles.usernameText}
                    >

                        Truck number: {user && user?.name}
                    </Text>
                </View>


            </View>
            <View>

                <ScrollView>

                    <View
                        style={globalStyles.scrollContainer}
                    >
                        <View
                            style={{ borderBottomWidth: 0.5, borderColor: '#191A19' }}
                        >

                            <Text
                                style={{
                                    marginLeft: 5,
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: '#191A19'
                                }}
                            >
                                Details
                            </Text>

                            <View
                                style={{

                                    flexDirection: 'row',
                                    width: '100%',
                                    height: height / 20,
                                    marginLeft: 10,
                                    alignItems: 'center'

                                }}
                            >
                                <Icon
                                    name="truck"
                                    size={20}
                                    color='#191A19'
                                />

                                <Text
                                    style={globalStyles.headerText}
                                >

                                    Truck type: {user && user?.truck_type}

                                </Text>

                            </View>

                            <View
                                style={{

                                    flexDirection: 'row',
                                    width: '100%',
                                    height: height / 20,
                                    marginLeft: 10,
                                    alignItems: 'center'

                                }}
                            >

                                <Icon
                                    name='user'
                                    size={20}
                                    color='#191A19'
                                />

                                <Text
                                    style={globalStyles.headerText}
                                >

                                    Assigned driver: {user && user?.day}

                                </Text>
                            </View>

                            <View
                                style={{

                                    flexDirection: 'row',
                                    width: '100%',
                                    height: height / 20,
                                    marginLeft: 10,
                                    alignItems: 'center'

                                }}
                            >
                                <Icon
                                    name="route"
                                    size={20}
                                    color='#191A19'
                                />

                                <Text
                                    style={globalStyles.headerText}
                                >

                                    Days of schedule: {user && user?.day}

                                </Text>

                            </View>

                         
                        </View>


                        <TouchableOpacity
                            style={globalStyles.scrollButtons}
                            onPress={() => navigation.navigate('My schedule')}
                        >

                            <Icon

                                name='history'
                                size={20}
                                color='#191A19'
                            />

                            <Text
                                style={globalStyles.buttonText}
                            >
                                View my area assignments
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={globalStyles.scrollButtons}
                            onPress={() => navigation.navigate('Activity History')}
                        >

                            <Icon

                                name='calendar-alt'
                                size={20}
                                color='#191A19'
                            />

                            <Text
                                style={globalStyles.buttonText}
                            >
                                View my activity history
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={globalStyles.scrollButtons}
                            onPress={() => navigation.navigate('Citizen reports history')}
                        >

                            <Icon

                                name='trash-alt'
                                size={20}
                                color='#191A19'
                            />

                            <Text
                                style={globalStyles.buttonText}
                            >
                                View my citizen reports history
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={globalStyles.scrollButtons}
                            onPress={logout}
                        >


                            <Icon

                                name='sign-out-alt'
                                size={20}
                                color='#191A19'
                            />

                            <Text
                                style={globalStyles.buttonText}
                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>


            </View >


        </View >

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    usernameText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff'
    },

    uploadImgBtn: {
        width: width / 4,
        height: height / 38,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 3,
        borderRadius: 12
    },

    btnText: {
        fontSize: 12
    }
})

