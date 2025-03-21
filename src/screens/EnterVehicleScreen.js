import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch, StyleSheet, Animated } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons"; // For icons

const EnterVehicleScreen = () => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [isTemporary, setIsTemporary] = useState(false);
  const fadeAnim = new Animated.Value(0); // For fade-in animation

  const isValidVRN = vehicleNumber.length >= 10; // Basic validation for VRN format

  // Fade-in animation
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      {/* Header with Gradient */}
      <LinearGradient colors={["#6200ea", "#3700b3"]} style={styles.headerContainer}>
        <Text style={styles.headerText}>Enter Vehicle Number</Text>
      </LinearGradient>

      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.subText}>
          The <Text style={styles.bold}>Vehicle Registration Number (VRN)</Text> should match with your RC document
        </Text>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          <Text style={styles.prefix}>IND</Text>
          <TextInput
            style={styles.input}
            placeholder="DL12AB0000"
            placeholderTextColor="#999"
            maxLength={10}
            autoCapitalize="characters"
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
          />
          <Icon name="directions-car" size={24} color="#6200ea" style={styles.inputIcon} />
        </View>

        {/* Temporary Vehicle Switch */}
        <View style={styles.checkboxContainer}>
          <Switch
            value={isTemporary}
            onValueChange={setIsTemporary}
            trackColor={{ false: "#767577", true: "#6200ea" }}
            thumbColor={isTemporary ? "#fff" : "#f4f3f4"}
          />
          <Text style={styles.checkboxText}>This is my temporary vehicle number</Text>
        </View>

        <TouchableOpacity>
          <Text style={styles.linkText}>Add vehicle via Chassis Number</Text>
        </TouchableOpacity>

        {/* Add Now Button with Gradient */}
        <TouchableOpacity
          style={[styles.button, !isValidVRN && styles.disabledButton]}
          disabled={!isValidVRN}
        >
          <LinearGradient
            colors={isValidVRN ? ["#FF5733", "#C70039"] : ["#ccc", "#ccc"]}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>Add now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#EDEDED" },

  /* Gradient Header */
  headerContainer: {
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  headerText: { color: "white", fontSize: 22, fontWeight: "bold" },

  subText: { fontSize: 16, textAlign: "center", color: "#666", marginBottom: 20 },
  bold: { fontWeight: "bold" },

  /* Input Styling */
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    backgroundColor: "#fff",
    borderColor: "#6200ea",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  prefix: { fontWeight: "bold", fontSize: 16, marginRight: 10, color: "#3700b3" },
  input: { flex: 1, fontSize: 16, color: "#000" },
  inputIcon: { marginLeft: 10 },

  /* Switch Styling */
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  checkboxText: { marginLeft: 10, fontSize: 14, color: "#333" },

  linkText: { color: "#6A5AE0", textAlign: "center", marginVertical: 10, textDecorationLine: "underline" },

  /* Button with Gradient */
  button: { borderRadius: 15, overflow: "hidden", elevation: 5, marginTop: 20 },
  gradientButton: { padding: 15, alignItems: "center", borderRadius: 15 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  disabledButton: { opacity: 0.5 },
});

export default EnterVehicleScreen;