import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function DashboardScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.balance}>₹{user?.walletBalance || 0}</Text>
        <Text>Wallet Balance</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Umbrellas')}>
        <Text style={styles.buttonText}>☂️ Find Umbrellas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Wallet')}>
        <Text style={styles.buttonText}>💳 Wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tracking')}>
        <Text style={styles.buttonText}>📍 Track Rentals</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 20, alignItems: 'center' },
  balance: { fontSize: 36, fontWeight: 'bold', color: '#10b981' },
  button: { backgroundColor: '#667eea', padding: 15, borderRadius: 10, marginBottom: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }
});
