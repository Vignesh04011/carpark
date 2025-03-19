import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("normal");

  // Handle login with validation
  const handleLogin = async () => {
    // Validate email and password
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    // Fetch stored credentials from AsyncStorage
    const storedEmail = await AsyncStorage.getItem('email');
    const storedPassword = await AsyncStorage.getItem('password');

    // Validate the entered credentials against stored values
    if (email === storedEmail && password === storedPassword) {
      console.log("Logged in successfully");
      navigation.replace("Main"); // Navigate to the Main screen
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/app_logo.png")} style={styles.logo} />

      {/* User Type Selection */}
      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={value => setUserType(value)} value={userType}>
          <View style={styles.radioOption}>
            <RadioButton value="normal" color="#613EEA" />
            <Text style={styles.radioText}>Normal User</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value="owner" color="#613EEA" />
            <Text style={styles.radioText}>Space Owner</Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Email Input */}
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

      {/* Password Input */}
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

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <Text style={styles.registerText}>
        Don't have an account? <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
          Register
        </Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  logo: { width: 120, height: 120, resizeMode: 'contain', marginBottom: 15 },
  title: { fontSize: 24, fontWeight: "bold", color: "#613EEA", marginBottom: 25 },
  radioContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20, backgroundColor: "#fff", padding: 15, borderRadius: 20 },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 20 },
  radioText: { fontSize: 16, fontWeight: "500" },
  inputContainer: { flexDirection: "row", alignItems: "center", width: "100%", borderWidth: 1, borderColor: "#bbb", borderRadius: 20, backgroundColor: "#fff", marginBottom: 15, paddingHorizontal: 15 },
  icon: { width: 28, height: 28, marginRight: 12 },
  input: { flex: 1, height: 55, fontSize: 17, color: "#2c3e50" },
  button: { width: "100%", height: 55, backgroundColor: "#613EEA", justifyContent: "center", alignItems: "center", borderRadius: 20 },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  registerText: { marginTop: 12, fontSize: 15, color: "#2c3e50" },
  registerLink: { color: "#613EEA", fontWeight: "bold" },
});

export default LoginScreen;
