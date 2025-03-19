import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ Handle Registration
  const handleRegister = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");

      if (storedEmail === email) {
        Alert.alert("Error", "User already exists. Please log in!");
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match!");
        return;
      }

      // ✅ Save credentials in AsyncStorage
      await AsyncStorage.setItem("email", email);
      await AsyncStorage.setItem("password", password);

      Alert.alert("Success", "Registration successful! Please log in.");
      navigation.replace("Login");
    } catch (error) {
      console.log("Registration Error:", error);
      Alert.alert("Error", "Something went wrong. Try again!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>Car <Text style={{ color: "#613EEA" }}>Park</Text></Text>
      <Text style={styles.title}>Register</Text>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Image source={require("../assets/icons/email.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require("../assets/icons/lock.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Image source={require("../assets/icons/lock.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Login Link */}
      <Text style={styles.loginText}>
        Already have an account? <Text style={styles.loginLink} onPress={() => navigation.navigate("Login")}>Login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  logo: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#613EEA", marginBottom: 20 },
  inputContainer: { flexDirection: "row", alignItems: "center", width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 15, paddingHorizontal: 10 },
  icon: { width: 20, height: 20, marginRight: 10 },
  input: { flex: 1, height: 50 },
  button: { width: "100%", height: 50, backgroundColor: "#613EEA", justifyContent: "center", alignItems: "center", borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loginText: { marginTop: 10, fontSize: 14 },
  loginLink: { color: "#613EEA", fontWeight: "bold" },
});

export default RegisterScreen;
