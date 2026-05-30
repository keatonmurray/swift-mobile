import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ChevronLeft } from "lucide-react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AnimatedEntry } from "../utils/animations";
import { API_BASE_URL } from "../utils/env";
import { Picker } from "react-native";
import { countries } from "../constants/countries";

const Register = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/register`, {
        first_name: firstName,
        last_name: lastName,
        email,
        account_type: "personal",
        password,
        password_confirmation: passwordConfirmation,
        country,
      });

      Toast.show({ type: "success", text1: response.data.message ?? "Account created" });
      navigation.navigate("Login");
    } catch (error) {
      if (error.response?.status === 422 && error.response.data?.errors) {
        Object.values(error.response.data.errors).forEach((msgs) =>
          msgs.forEach((msg) => Toast.show({ type: "error", text1: msg }))
        );
      } else {
        Toast.show({ type: "error", text1: error.response?.data?.message || "Something went wrong" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const InputField = ({ label, icon, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, toggleSecure, showToggle }) => (
    <View className="mb-4">
      <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: "600", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>
        {label}
      </Text>
      <View className="flex-row items-center gap-3 px-3" style={{ height: 56, borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" }}>
        <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>{icon}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize || "none"}
          placeholderTextColor="rgba(255,255,255,0.3)"
          className="flex-1 text-white"
          style={{ fontSize: 16 }}
        />
        {showToggle && (
          <Pressable onPress={toggleSecure}>
            <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
              {secureTextEntry ? "Show" : "Hide"}
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <View className="flex-1" style={{ backgroundColor: "#000" }}>
      <LinearGradient
        colors={["rgba(0,255,140,0.25)", "rgba(157,255,0,0.15)", "rgba(0,0,0,1)"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0.2, y: 1 }}
        end={{ x: 0.8, y: 0 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1">
          <ScrollView className="flex-1 px-5" contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
            {/* Header */}
            <AnimatedEntry delay={0} className="pt-4 pb-3">
              <Pressable
                onPress={() => navigation.navigate("SelectAccountType")}
                className="items-center justify-center rounded-full"
                style={{ width: 60, height: 60, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(255,255,255,0.06)" }}
              >
                <ChevronLeft size={20} color="white" />
              </Pressable>
            </AnimatedEntry>

            {/* Eyebrow */}
            <AnimatedEntry delay={0}>
              <Text style={{ color: "#D9FF43", letterSpacing: 2, fontSize: 12, fontWeight: "600", textTransform: "uppercase" }}>
                Create account
              </Text>
            </AnimatedEntry>

            {/* Heading */}
            <AnimatedEntry delay={0.05} className="mt-2">
              <Text className="text-white" style={{ fontSize: 36, lineHeight: 36, letterSpacing: -1, fontWeight: "500" }}>
                Get started{"\n"}
                <Text style={{ color: "#D9FF43" }}>in minutes.</Text>
              </Text>
            </AnimatedEntry>

            {/* Subtext */}
            <AnimatedEntry delay={0.15} className="mt-3 mb-6">
              <Text style={{ color: "rgba(255,255,255,0.72)", maxWidth: 340, fontSize: 15 }}>
                Set up your Swift account. We'll guide you through verification next.
              </Text>
            </AnimatedEntry>

            {/* Form */}
            <AnimatedEntry delay={0.2}>
              {/* Section: Personal Info */}
              <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                Personal info
              </Text>

              <InputField label="First name" icon="👤" value={firstName} onChangeText={setFirstName} />
              <InputField label="Last name" icon="👤" value={lastName} onChangeText={setLastName} />

              {/* Country Picker */}
              <View className="mb-6">
                <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, fontWeight: "600", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8, paddingLeft: 4 }}>
                  Country
                </Text>
                <View className="flex-row items-center gap-3 px-3" style={{ height: 56, borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.05)" }}>
                  <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>🌍</Text>
                  <TextInput
                    value={country}
                    onChangeText={setCountry}
                    placeholder="Country code (e.g. US, GB)"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    autoCapitalize="characters"
                    className="flex-1 text-white"
                    style={{ fontSize: 16 }}
                  />
                </View>
              </View>

              {/* Section: Account Details */}
              <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                Account details
              </Text>

              <InputField label="Email" icon="✉" value={email} onChangeText={setEmail} keyboardType="email-address" />

              {/* Section: Security */}
              <Text style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, fontWeight: "600", letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                Security
              </Text>

              <InputField
                label="Password" icon="🔒" value={password} onChangeText={setPassword}
                secureTextEntry={!showPassword} showToggle toggleSecure={() => setShowPassword(!showPassword)}
              />
              <InputField
                label="Confirm password" icon="🔒" value={passwordConfirmation} onChangeText={setPasswordConfirmation}
                secureTextEntry={!showConfirm} showToggle toggleSecure={() => setShowConfirm(!showConfirm)}
              />

              {/* Submit */}
              <Pressable
                onPress={handleSubmit}
                disabled={submitting}
                className="w-full items-center justify-center rounded-full"
                style={{
                  height: 56, backgroundColor: "#D9FF43",
                  opacity: submitting ? 0.7 : 1,
                  shadowColor: "#D9FF43", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.28, shadowRadius: 30,
                }}
              >
                <Text className="font-semibold" style={{ color: "#000", fontSize: 16 }}>
                  {submitting ? "Creating account..." : "Create account"}
                </Text>
              </Pressable>

              {/* Login link */}
              <Text className="text-center mt-4" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                Already have an account?{" "}
                <Text onPress={() => navigation.navigate("Login")} style={{ color: "#fff", fontWeight: "600" }}>
                  Sign in
                </Text>
              </Text>
            </AnimatedEntry>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Register;
