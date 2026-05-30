import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ChevronLeft } from "lucide-react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import { AnimatedEntry } from "../utils/animations";
import storage from "../utils/storage";
import { API_BASE_URL } from "../utils/env";

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/login`, {
        email,
        password,
        account_type: "personal",
      });

      if (response.data?.user) {
        await storage.set("api_token", response.data.token);
        await storage.set("user_id", String(response.data.user.id));
        await storage.set("account_type", response.data.user.account_type);
        navigation.navigate("Dashboard", { id: response.data.user.id });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        Toast.show({
          type: "error",
          text1: error.response?.data?.message || "Invalid credentials",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

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
          <ScrollView
            className="flex-1 px-5"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <AnimatedEntry delay={0} className="pt-4 pb-3">
              <Pressable
                onPress={() => navigation.navigate("Home")}
                className="items-center justify-center rounded-full"
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.06)",
                }}
              >
                <ChevronLeft size={20} color="white" />
              </Pressable>
            </AnimatedEntry>

            {/* Main */}
            <View className="flex-1 justify-center">
              {/* Eyebrow */}
              <AnimatedEntry delay={0.05}>
                <Text
                  style={{
                    color: "#D9FF43",
                    letterSpacing: 2,
                    fontSize: 12,
                    fontWeight: "600",
                    textTransform: "uppercase",
                  }}
                >
                  Welcome back
                </Text>
              </AnimatedEntry>

              {/* Heading */}
              <AnimatedEntry delay={0.1} className="mt-2">
                <Text
                  className="text-white"
                  style={{
                    fontSize: 36,
                    lineHeight: 36,
                    letterSpacing: -1,
                    fontWeight: "500",
                  }}
                >
                  Sign in to{"\n"}
                  <Text style={{ color: "#D9FF43" }}>your account.</Text>
                </Text>
              </AnimatedEntry>

              {/* Subtext */}
              <AnimatedEntry delay={0.15} className="mt-4 mb-8">
                <Text style={{ color: "rgba(255,255,255,0.72)", fontSize: 15, maxWidth: 280 }}>
                  Enter your credentials to access your dashboard.
                </Text>
              </AnimatedEntry>

              {/* Form */}
              <AnimatedEntry delay={0.2}>
                {/* Email */}
                <View className="mb-4">
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      marginBottom: 8,
                      paddingLeft: 4,
                    }}
                  >
                    Email
                  </Text>
                  <View
                    className="flex-row items-center gap-3 px-3"
                    style={{
                      height: 56,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.1)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>✉</Text>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      className="flex-1 text-white"
                      style={{ fontSize: 16 }}
                    />
                  </View>
                </View>

                {/* Password */}
                <View className="mb-2">
                  <Text
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: 12,
                      fontWeight: "600",
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      marginBottom: 8,
                      paddingLeft: 4,
                    }}
                  >
                    Password
                  </Text>
                  <View
                    className="flex-row items-center gap-3 px-3"
                    style={{
                      height: 56,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "rgba(255,255,255,0.1)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                  >
                    <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 18 }}>🔒</Text>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoComplete="current-password"
                      placeholderTextColor="rgba(255,255,255,0.3)"
                      className="flex-1 text-white"
                      style={{ fontSize: 16 }}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <Text style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>
                        {showPassword ? "Hide" : "Show"}
                      </Text>
                    </Pressable>
                  </View>
                </View>

                {/* Forgot */}
                <View className="flex-row justify-end mb-4">
                  <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                    Forgot password?
                  </Text>
                </View>

                {/* Submit */}
                <Pressable
                  onPress={handleLogin}
                  disabled={submitting}
                  className="w-full items-center justify-center rounded-full"
                  style={{
                    height: 56,
                    backgroundColor: "#D9FF43",
                    opacity: submitting ? 0.7 : 1,
                  }}
                >
                  <Text className="font-semibold" style={{ color: "#000", fontSize: 16 }}>
                    {submitting ? "Signing in..." : "Sign in"}
                  </Text>
                </Pressable>
              </AnimatedEntry>

              {/* Register */}
              <AnimatedEntry delay={0.3} className="mt-4">
                <Text className="text-center" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                  Don't have an account?{" "}
                  <Text
                    onPress={() => navigation.navigate("SelectAccountType")}
                    style={{ color: "#fff", fontWeight: "600" }}
                  >
                    Create one
                  </Text>
                </Text>
              </AnimatedEntry>
            </View>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Login;
