import React, { useState, useRef, useEffect } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const promotions = [
  require('../assets/images/promo1.png'),
  require('../assets/images/promo2.png'),
  require('../assets/images/promo3.png'),
];

const screenWidth = Dimensions.get('window').width;

const PromotionsBanner = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % promotions.length;

        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        return nextIndex;
      });
    }, 5000); // Auto-scroll every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.bannerContainer}>
      <FlatList
        ref={flatListRef}
        data={promotions}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Image source={item} style={styles.banner} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  banner: {
    width: screenWidth * 0.9,
    height: 160,
    borderRadius: 15,
    marginHorizontal: 5,
    resizeMode: 'cover',
    elevation: 5, // Adds a subtle shadow effect for better UI
  },
});

export default PromotionsBanner;
