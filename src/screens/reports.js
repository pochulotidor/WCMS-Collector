import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import { globalStyles } from '../global/globalStyles';

const height = Dimensions.get('screen').height;


export default function Reports({ navigation }) {

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = firestore()
      .collection('citizen_reports')
      .where('complete', '==', false)
      //.orderBy('reportTime', 'desc')
      .onSnapshot(querySnapshot => {
        const reports = [];

        querySnapshot.forEach(documentSnapshot => {
          reports.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });

        });

        setReports(reports);

        setLoading(false);
      });



    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          alignItems: 'center', justifyContent: 'center', flex: 1
        }}
      >
        <ActivityIndicator size="large" color="#4CB963" />
      </View>
    )
  }



  return (
    <View>

      <FlatList
        data={reports}
        renderItem={({ item }) => (
          <View >

            <View
              style={{ width: '100%', backgroundColor: '#E4E4E4' }}
            >

              <TouchableOpacity
                style={globalStyles.reportContainer}
                onPress={() => navigation.navigate('Location', { latitude: item.loc.latitude, longitude: item.loc.longitude })}
              >
                <Text
                  style={globalStyles.reportText}
                >
                  Report ID: {item.key}</Text>
                <Text
                  style={globalStyles.reportText}
                >
                  Status: {item.complete ? 'Collected' : 'Not Collected'}</Text>
                <Text
                  style={globalStyles.reportText}
                >
                  Latitude: {[item.loc.latitude]}, Longitude: {[item.loc.longitude]}</Text>
                <Text
                  style={globalStyles.reportText}
                >
                  Report time: {[item.reportTime.toDate().toDateString()]}</Text>
              </TouchableOpacity>



            </View>

          </View>
        )}
      />
    </View>


  );
}


{/**/ }