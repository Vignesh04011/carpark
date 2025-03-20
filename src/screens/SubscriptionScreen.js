import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SubscriptionScreen = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const handleSubscription = (plan) => {
        setSelectedPlan(plan);
        Alert.alert("Subscription Successful", `You have subscribed to ${plan} plan.`);
        // Here, you can save the subscription to AsyncStorage or Firebase
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Choose Your Subscription</Text>
            
            {/* Normal Plan */}
            <TouchableOpacity 
                style={[styles.plan, selectedPlan === 'Normal' && styles.selectedPlan]} 
                onPress={() => handleSubscription('Normal')}
            >
                <Text style={styles.planTitle}>Normal</Text>
                <Text style={styles.planDetails}>✔ Basic parking access</Text>
                <Text style={styles.planDetails}>✔ Standard slots</Text>
            </TouchableOpacity>

            {/* Gold Plan */}
            <TouchableOpacity 
                style={[styles.plan, selectedPlan === 'Gold' && styles.selectedPlan]} 
                onPress={() => handleSubscription('Gold')}
            >
                <Text style={styles.planTitle}>Gold</Text>
                <Text style={styles.planDetails}>✔ Priority parking</Text>
                <Text style={styles.planDetails}>✔ Discounted rates</Text>
            </TouchableOpacity>

            {/* Platinum Plan */}
            <TouchableOpacity 
                style={[styles.plan, selectedPlan === 'Platinum' && styles.selectedPlan]} 
                onPress={() => handleSubscription('Platinum')}
            >
                <Text style={styles.planTitle}>Platinum</Text>
                <Text style={styles.planDetails}>✔ VIP parking</Text>
                <Text style={styles.planDetails}>✔ Free cancellations</Text>
                <Text style={styles.planDetails}>✔ Premium support</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    plan: {
        backgroundColor: '#eee',
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    selectedPlan: {
        borderColor: '#007bff',
        borderWidth: 2,
    },
    planTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    planDetails: {
        fontSize: 14,
        marginTop: 5,
    },
});

export default SubscriptionScreen;
