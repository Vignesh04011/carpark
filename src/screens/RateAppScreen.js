import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RateAppScreen = ({ navigation }) => {
  const [selectedRating, setSelectedRating] = useState(null);

  const handleRating = (rating) => {
    setSelectedRating(rating);
    // Here, you can send the rating to the backend if needed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Us</Text>
      <Text style={styles.subtitle}>How was your experience?</Text>
      <View style={styles.emojiContainer}>
        <TouchableOpacity onPress={() => handleRating('great')}>
          <Text style={styles.emoji}>😁</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRating('good')}>
          <Text style={styles.emoji}>🙂</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRating('neutral')}>
          <Text style={styles.emoji}>😐</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRating('bad')}>
          <Text style={styles.emoji}>☹️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRating('terrible')}>
          <Text style={styles.emoji}>😞</Text>
        </TouchableOpacity>
      </View>
      {selectedRating && <Text style={styles.thanks}>Thanks for your feedback! 😊</Text>}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginVertical: 20,
  },
  emoji: {
    fontSize: 40,
  },
  thanks: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#6A0DAD',
    borderRadius: 5,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RateAppScreen;
