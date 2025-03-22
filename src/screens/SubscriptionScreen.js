import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SubscriptionScreen = () => {
    const [billingCycle, setBillingCycle] = useState('Monthly');
    const { width } = Dimensions.get('window');
    const [selectedPlan, setSelectedPlan] = useState('Platinum');

    const subscriptions = [
        {
            title: 'Platinum',
            monthlyPrice: ' ₹600/month',
            yearlyPrice: '  ₹6600/year',
            features: [
                'Priority Parking',
                'Limited Reservations',
                'Premium Support'
            ],
            gradient: ['#6a11cb', '#2575fc'] // Gradient effect
        },
        {
            title: 'Normal',
            monthlyPrice: '₹800/month',
            yearlyPrice: '₹8800/year',
            features: [
                'Basic Parking Access',
                'Limited Reservations',
                'Standard Support'
            ],
            gradient: ['#43cea2', '#185a9d']
        },
        {
            title: 'Diamond',
            monthlyPrice: '₹1000/month',
            yearlyPrice: '₹11000/year',
            features: [
                'Exclusive Parking',
                'VIP Access',
                '24/7 Concierge Support'
            ],
            gradient: ['#ff512f', '#dd2476']
        }
    ];

    return (
        <LinearGradient colors={['#1c1c1c', '#2e2e2e']} style={{ flex: 1, paddingVertical: 30, alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 15 }}>
                Choose Your Subscription
            </Text>

            {/* Billing Toggle */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20, backgroundColor: '#444', padding: 10, borderRadius: 20, width: '80%' }}>
                <TouchableOpacity onPress={() => setBillingCycle('Monthly')} style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: billingCycle === 'Monthly' ? 'white' : 'grey', fontSize: 18, fontWeight: 'bold' }}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setBillingCycle('Yearly')} style={{ flex: 1, alignItems: 'center' }}>
                    <Text style={{ color: billingCycle === 'Yearly' ? 'white' : 'grey', fontSize: 18, fontWeight: 'bold' }}>Yearly</Text>
                </TouchableOpacity>
            </View>

            {/* Subscription Cards */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled contentContainerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                {subscriptions.map((plan, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedPlan(plan.title)}>
                        <LinearGradient colors={plan.gradient} style={{
                            width: width * 0.9,
                            marginHorizontal: 10,
                            borderRadius: 15,
                            padding: 30,
                            alignItems: 'center',
                            minHeight: 380
                        }}>
                            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{plan.title}</Text>
                            <Text style={{ color: 'white', fontSize: 22, marginBottom: 15 }}>
                                {billingCycle === 'Monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                            </Text>
                            {plan.features.map((feature, i) => (
                                <Text key={i} style={{ color: 'white', fontSize: 16, marginBottom: 8 }}>✔ {feature}</Text>
                            ))}
                            <TouchableOpacity style={{ backgroundColor: 'white', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 10, marginTop: 20 }}>
                                <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold' }}>Get Started</Text>
                            </TouchableOpacity>
                        </LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </LinearGradient>
    );
};

export default SubscriptionScreen;
