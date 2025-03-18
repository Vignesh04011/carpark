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
      const nextIndex = (currentIndex + 1) % promotions.length;
      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <FlatList
      ref={flatListRef}
      data={promotions}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <Image source={item} style={styles.banner} />}
    />
  );
};

const styles = StyleSheet.create({
  banner: {
    width: screenWidth * 0.9,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
    resizeMode: 'cover',
  },
});

export default PromotionsBanner;
