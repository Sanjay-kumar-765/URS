import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UmbrellaScreen() {
  const [umbrellas, setUmbrellas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/umbrellas').then(res => setUmbrellas(res.data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Umbrellas</Text>
      <FlatList
        data={umbrellas.filter(u => u.isAvailable)}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.id}>{item.umbrellaId}</Text>
            <Text style={styles.color}>{item.color}</Text>
            <Text>{item.location?.address}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 10 },
  id: { fontSize: 18, fontWeight: 'bold' },
  color: { fontSize: 14, color: '#667eea', textTransform: 'capitalize' }
});
