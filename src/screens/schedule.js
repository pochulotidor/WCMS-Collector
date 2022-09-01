import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FlatList } from 'react-native-gesture-handler';


const height = Dimensions.get('window').height;

export default function Schedule({navigation}) {

    const collector = auth().currentUser;
    const [schedule, setSchedule] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const subscriber = firestore()
            .collection('schedule')
            .where('assignedTo', '==', collector.uid)
            .onSnapshot(querySnapshot => {
                const sched = [];

                querySnapshot.forEach(documentSnapshot => {
                    sched.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });

                setSchedule(sched);
                setLoading(false);
            });

        // Unsubscribe from events when no longer in use
        return () => subscriber();

    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    return (
        <View
            style={{
            backgroundColor: '#EEEEEE'
        }}
        >
            <FlatList
                data={schedule}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.wrapper}
                        onPress={() => navigation.navigate('Area Location', { Location: item.location, Initial: item.initial })}
                       
                    >
                        <Text
                            style={styles.text}
                        >
                            {item.AreaName}
                        </Text>

                        <Text
                            style={styles.subtext}
                        >
                            Days: {item.day}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: height / 8,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        marginBottom: 5,
        borderBottomWidth: 0.3
    },

    text: {
        fontSize: 20,
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#191A19'
    },

    subtext: {
        fontSize: 12,
        marginLeft: 5,
        fontWeight: 'bold',
        color: '#191A19'

    }
})