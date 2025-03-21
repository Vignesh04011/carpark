import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      // Fetch stored user data from AsyncStorage
      const storedUserData = await AsyncStorage.getItem("userData");

      if (storedUserData) {
        const userData = JSON.parse(storedUserData);

        // Validate the entered credentials against stored values
        if (email === userData.email && password === userData.password) {
          Alert.alert("Success", "Logged in successfully!");
          navigation.replace("Main"); // Navigate to the Main screen
        } else {
          Alert.alert("Error", "Invalid credentials, please try again.");
        }
      } else {
        Alert.alert("Error", "No user found. Please register first.");
      }
    } catch (error) {
      console.log("Error during login:", error);
      Alert.alert("Error", "Failed to login. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/images/app_logo.png")} style={styles.logo} />

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
        Don't have an account?{" "}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>
          Register
        </Text>
        .
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 55,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 20,
    backgroundColor: "#fff",
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: {
    width: 28,
    height: 28,
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 55,
    fontSize: 17,
    color: "#2c3e50",
  },
  button: {
    width: "100%",
    height: 55,
    backgroundColor: "#613EEA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 12,
    fontSize: 15,
    color: "#2c3e50",
  },
  registerLink: {
    color: "#613EEA",
    fontWeight: "bold",
  },
});

export default LoginScreen;
