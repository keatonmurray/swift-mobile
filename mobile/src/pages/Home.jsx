import { View, Text, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AnimatedEntry } from "../utils/animations";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1" style={{ backgroundColor: "#000" }}>
      <LinearGradient
        colors={[
          "rgba(0,255,140,0.25)",
          "rgba(157,255,0,0.15)",
          "rgba(0,0,0,1)",
        ]}
        locations={[0, 0.4, 1]}
        start={{ x: 0.2, y: 1 }}
        end={{ x: 0.8, y: 0 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 justify-between px-6">
          {/* Top Badge */}
          <AnimatedEntry delay={0} className="items-center mt-4">
            <View
              style={{
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.1)",
                backgroundColor: "rgba(255,255,255,0.06)",
                borderRadius: 999,
                paddingHorizontal: 16,
                paddingVertical: 8,
              }}
            >
              <Text
                style={{
                  color: "rgba(255,255,255,0.72)",
                  fontSize: 11,
                  fontWeight: "600",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                ✦ Trusted by 500k+ users
              </Text>
            </View>
          </AnimatedEntry>

          {/* Main Content */}
          <View className="items-center flex-1 justify-center">
            {/* Logo */}
            <AnimatedEntry delay={0.05} className="mb-10">
              <Text
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: "700",
                  letterSpacing: -1,
                }}
              >
                Swift
              </Text>
            </AnimatedEntry>

            {/* Headline */}
            <AnimatedEntry delay={0.1} className="mb-6">
              <Text
                className="text-white text-center"
                style={{
                  fontSize: 44,
                  lineHeight: 44,
                  letterSpacing: -1.5,
                  fontWeight: "500",
                  maxWidth: 340,
                }}
              >
                Move money.{"\n"}
                <Text style={{ color: "#D9FF43" }}>Track finances.</Text>
              </Text>
            </AnimatedEntry>

            {/* Subtext */}
            <AnimatedEntry delay={0.2} className="mb-8">
              <Text
                className="text-center"
                style={{
                  color: "rgba(255,255,255,0.72)",
                  maxWidth: 260,
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                A gateway that operates accounting for you.
              </Text>
            </AnimatedEntry>

            {/* Buttons */}
            <AnimatedEntry delay={0.3} className="w-full" style={{ maxWidth: 340 }}>
              <Pressable
                onPress={() => navigation.navigate("SelectAccountType")}
                className="w-full items-center justify-center rounded-full mb-3"
                style={{
                  height: 56,
                  backgroundColor: "#D9FF43",
                  shadowColor: "#D9FF43",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: 0.28,
                  shadowRadius: 30,
                  elevation: 8,
                }}
              >
                <Text className="font-semibold" style={{ color: "#000", fontSize: 16 }}>
                  Create an Account
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate("Login")}
                className="w-full items-center justify-center rounded-full"
                style={{
                  height: 56,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderWidth: 1,
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              >
                <Text className="text-white" style={{ fontSize: 16 }}>
                  Sign In
                </Text>
              </Pressable>
            </AnimatedEntry>
          </View>

          {/* Footer */}
          <AnimatedEntry delay={0.5} className="pb-4">
            <Text
              className="text-center"
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: 12,
              }}
            >
              By continuing, you agree to our{" "}
              <Text style={{ color: "rgba(255,255,255,0.72)", textDecorationLine: "underline" }}>
                Terms
              </Text>
              {" & "}
              <Text style={{ color: "rgba(255,255,255,0.72)", textDecorationLine: "underline" }}>
                Privacy Policy
              </Text>
            </Text>
          </AnimatedEntry>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default Home;
