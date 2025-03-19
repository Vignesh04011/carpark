import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert 
} from "react-native";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("normal");

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  // ✅ Check if user is already logged in
  const checkLoggedInUser = async () => {
    const storedEmail = await AsyncStorage.getItem("email");
    if (storedEmail) {
      navigation.replace("Main");  // Redirect to the main app
    }
  };

  // ✅ Handle Login
  const handleLogin = async () => {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      const storedPassword = await AsyncStorage.getItem("password");

      if (email === storedEmail && password === storedPassword) {
        Alert.alert("Success", "Login Successful!");
        await AsyncStorage.setItem("isLoggedIn", "true");
        navigation.replace("Main");  // Navigate to the main app
      } else {
        Alert.alert("Error", "Invalid Email or Password!");
      }
    } catch (error) {
      console.log("Login Error:", error);
      Alert.alert("Error", "Something went wrong. Try again!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>Car <Text style={{ color: "#613EEA" }}>Park</Text></Text>
      <Text style={styles.title}>Login</Text>

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

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <Text style={styles.registerText}>
        If not signed in, <Text style={styles.registerLink} onPress={() => navigation.navigate("Register")}>then register</Text>.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#fff" },
  logo: { fontSize: 28, fontWeight: "bold", marginBottom: 10 },
  title: { fontSize: 22, fontWeight: "bold", color: "#613EEA", marginBottom: 20 },
  radioContainer: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  radioOption: { flexDirection: "row", alignItems: "center", marginRight: 15 },
  radioText: { fontSize: 16 },
  inputContainer: { flexDirection: "row", alignItems: "center", width: "100%", borderWidth: 1, borderColor: "#ccc", borderRadius: 10, marginBottom: 15, paddingHorizontal: 10 },
  icon: { width: 20, height: 20, marginRight: 10 },
  input: { flex: 1, height: 50 },
  button: { width: "100%", height: 50, backgroundColor: "#613EEA", justifyContent: "center", alignItems: "center", borderRadius: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  registerText: { marginTop: 10, fontSize: 14 },
  registerLink: { color: "#613EEA", fontWeight: "bold" },
});

export default LoginScreen;
