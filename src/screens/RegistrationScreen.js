import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("normal");

  const handleRegister = async () => {
    if (!username || !email || !phone || !password) {
      Alert.alert("Error", "Please fill all fields correctly");
      return;
    }

    // Create a user object
    const userData = {
      username,
      email,
      phone,
      userType,
    };

    try {
      // Store user data in AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
      console.log("User data stored successfully:", userData);

      // Navigate to the main screen
      navigation.replace("Main");
    } catch (error) {
      console.log("Error storing user data:", error);
      Alert.alert("Error", "Failed to register. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo image */}
      <Image source={require("../assets/images/app_logo.png")} style={styles.logo} />

      <View style={styles.radioContainer}>
        <RadioButton.Group onValueChange={(value) => setUserType(value)} value={userType}>
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

      <View style={styles.inputContainer}>
        <Image source={require("../assets/icons/user.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
      </View>

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
        <Image source={require("../assets/icons/phone.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
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

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Already have an account?{" "}
        <Text style={styles.registerLink} onPress={() => navigation.navigate("Login")}>
          Login
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
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#613EEA",
    marginBottom: 25,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  radioText: {
    fontSize: 16,
    fontWeight: "500",
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

export default RegisterScreen;