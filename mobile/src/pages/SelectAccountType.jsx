import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";

const SelectAccountType = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("personal");

  const options = [
    {
      id: "personal",
      title: "Personal",
      desc: "For individuals and personal use",
      icon: "👤",
    },
    {
      id: "business",
      title: "Business",
      desc: "For companies and organizations",
      icon: "💼",
      comingSoon: true,
    },
  ];

  const active = options.find((o) => o.id === selected) ?? options[0];

  return (
    <View className="flex-1" style={{ backgroundColor: "#000" }}>
      <LinearGradient
        colors={["rgba(0,255,140,0.25)", "rgba(157,255,0,0.15)", "rgba(0,0,0,1)"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0.2, y: 1 }}
        end={{ x: 0.8, y: 0 }}
        className="flex-1"
      >
        <SafeAreaView className="flex-1 px-5">
          {/* Header */}
          <AnimatedEntry delay={0} className="pt-4 pb-3">
            <Pressable
              onPress={() => navigation.navigate("Home")}
              className="items-center justify-center rounded-full"
              style={{
                width: 60, height: 60,
                backgroundColor: "rgba(255,255,255,0.05)",
                borderWidth: 1, borderColor: "rgba(255,255,255,0.06)",
              }}
            >
              <ChevronLeft size={20} color="white" />
            </Pressable>
          </AnimatedEntry>

          <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
            {/* Eyebrow */}
            <AnimatedEntry delay={0}>
              <Text style={{ color: "#D9FF43", letterSpacing: 2, fontSize: 12, fontWeight: "600", textTransform: "uppercase" }}>
                Welcome
              </Text>
            </AnimatedEntry>

            {/* Heading */}
            <AnimatedEntry delay={0.05} className="mt-2">
              <Text className="text-white" style={{ fontSize: 36, lineHeight: 36, letterSpacing: -1, fontWeight: "500" }}>
                Choose your{"\n"}
                <Text style={{ color: "#D9FF43" }}>account type.</Text>
              </Text>
            </AnimatedEntry>

            {/* Subtext */}
            <AnimatedEntry delay={0.15} className="mt-3 mb-8">
              <Text style={{ color: "rgba(255,255,255,0.72)", maxWidth: 340, fontSize: 15 }}>
                Tell us a bit about yourself so we can tailor the experience.
              </Text>
            </AnimatedEntry>

            {/* Options */}
            <AnimatedEntry delay={0.25}>
              {options.map((opt) => {
                const isActive = selected === opt.id;
                return (
                  <Pressable
                    key={opt.id}
                    disabled={opt.comingSoon}
                    onPress={() => setSelected(opt.id)}
                    className="flex-row items-center gap-3 mb-3"
                    style={{
                      padding: 20, borderRadius: 20,
                      backgroundColor: isActive ? "rgba(217,255,67,0.08)" : "rgba(255,255,255,0.04)",
                      borderWidth: 1,
                      borderColor: isActive ? "rgba(217,255,67,0.6)" : "rgba(255,255,255,0.1)",
                      opacity: opt.comingSoon ? 0.6 : 1,
                    }}
                  >
                    {/* Icon */}
                    <View
                      className="items-center justify-center"
                      style={{
                        width: 48, height: 48, borderRadius: 16,
                        backgroundColor: isActive ? "#D9FF43" : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <Text style={{ fontSize: 24 }}>{opt.icon}</Text>
                    </View>

                    {/* Content */}
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2">
                        <Text className="text-white" style={{ fontSize: 16, fontWeight: "600" }}>
                          {opt.title}
                        </Text>
                        {opt.comingSoon && (
                          <View
                            style={{
                              paddingHorizontal: 10, paddingVertical: 3, borderRadius: 999,
                              backgroundColor: "rgba(255,255,255,0.08)",
                              borderWidth: 1, borderColor: "rgba(255,255,255,0.1)",
                            }}
                          >
                            <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Soon</Text>
                          </View>
                        )}
                      </View>
                      <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginTop: 4 }}>
                        {opt.desc}
                      </Text>
                    </View>

                    {/* Radio */}
                    <View
                      className="items-center justify-center"
                      style={{
                        width: 20, height: 20, borderRadius: 10,
                        backgroundColor: isActive ? "#D9FF43" : "transparent",
                        borderWidth: isActive ? 0 : 1,
                        borderColor: "rgba(255,255,255,0.25)",
                      }}
                    >
                      {isActive && (
                        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: "#000" }} />
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </AnimatedEntry>

            {/* CTA */}
            <AnimatedEntry delay={0.35} className="mt-4">
              <Pressable
                onPress={() => !active.comingSoon && navigation.navigate("Register")}
                className="w-full items-center justify-center rounded-full flex-row"
                style={{
                  height: 56,
                  backgroundColor: active.comingSoon ? "rgba(255,255,255,0.3)" : "#D9FF43",
                  shadowColor: "#D9FF43",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: active.comingSoon ? 0 : 0.28,
                  shadowRadius: 30,
                }}
              >
                <Text className="font-semibold" style={{ color: "#000", fontSize: 16 }}>
                  Continue
                </Text>
                <ChevronRight size={20} color="#000" />
              </Pressable>

              <Text className="text-center mt-4" style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                Already have an account?{" "}
                <Text
                  onPress={() => navigation.navigate("Login")}
                  style={{ color: "#fff", fontWeight: "600" }}
                >
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

export default SelectAccountType;
