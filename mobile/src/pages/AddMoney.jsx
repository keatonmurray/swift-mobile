import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  Wallet,
  Landmark,
  CreditCard,
  Smartphone,
  Shield,
  ChevronRight,
  ChevronLeft,
  CircleHelp,
} from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";
import GlassCard from "../components/GlassCard";
import ScreenHeader from "../components/ScreenHeader";

const AddMoney = () => {
  const navigation = useNavigation();
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const [amount, setAmount] = useState("");

  const methods = [
    {
      title: "Bank Transfer",
      subtitle: "Transfer from your bank account.",
      time: "1–3 business days",
      icon: <Landmark size={22} color="#D6FF00" />,
    },
    {
      title: "Debit / Credit Card",
      subtitle: "Add instantly using your card.",
      time: "Instant",
      icon: <CreditCard size={22} color="#D6FF00" />,
    },
    {
      title: "E-Wallet",
      subtitle: "Add instantly from your e-wallet.",
      time: "Instant",
      icon: <Smartphone size={22} color="#D6FF00" />,
    },
  ];

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-grow px-5 pt-4 pb-12" keyboardShouldPersistTaps="handled">
          {/* Header */}
          <AnimatedEntry delay={0}>
            <ScreenHeader title="Add Money" onBack={() => navigation.goBack()} />
          </AnimatedEntry>

          {/* Add to Balance Card */}
          <AnimatedEntry delay={0.1} className="mb-5 mt-4">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              Add to
            </Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(214,255,0,0.08)" }}
                >
                  <Wallet size={22} color="#D6FF00" />
                </View>
                <View>
                  <Text className="text-white font-bold" style={{ fontSize: 16 }}>
                    Swift Balance
                  </Text>
                  <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 12 }}>
                    USD
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="text-white font-bold" style={{ fontSize: 18 }}>
                  $12,456.78
                </Text>
                <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 11 }}>
                  Available
                </Text>
              </View>
            </GlassCard>
          </AnimatedEntry>

          {/* Methods List */}
          <AnimatedEntry delay={0.2} className="mb-5">
            <Text className="text-neutral-400 mb-3" style={{ fontSize: 14 }}>
              Choose deposit method
            </Text>
            <View className="flex-col gap-3">
              {methods.map((method, index) => {
                const active = selectedMethod === method.title;
                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedMethod(method.title)}
                  >
                    <GlassCard
                      className="p-4 rounded-2xl flex-row justify-between items-center"
                      style={{
                        borderWidth: 1,
                        borderColor: active ? "#D6FF00" : "rgba(255,255,255,0.06)",
                      }}
                    >
                      <View className="flex-row items-center gap-3 flex-1 pr-3">
                        <View
                          className="w-11 h-11 rounded-full items-center justify-center"
                          style={{ backgroundColor: "rgba(214,255,0,0.08)" }}
                        >
                          {method.icon}
                        </View>
                        <View className="flex-1">
                          <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                            {method.title}
                          </Text>
                          <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 12 }}>
                            {method.subtitle}
                          </Text>
                          <Text className="text-neutral-500 mt-0.5 font-medium" style={{ fontSize: 11 }}>
                            {method.time}
                          </Text>
                        </View>
                      </View>
                      <View
                        className="w-6 h-6 rounded-full items-center justify-center"
                        style={{
                          borderWidth: 2,
                          borderColor: active ? "#D6FF00" : "rgba(255,255,255,0.3)",
                          backgroundColor: active ? "#D6FF00" : "transparent",
                        }}
                      >
                        {active && <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12 }}>✓</Text>}
                      </View>
                    </GlassCard>
                  </Pressable>
                );
              })}
            </View>
          </AnimatedEntry>

          {/* Amount input */}
          <AnimatedEntry delay={0.3} className="mb-6">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              Enter amount
            </Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <Text style={{ fontSize: 24 }}>🇺🇸</Text>
                <Text className="text-white font-bold" style={{ fontSize: 16 }}>USD</Text>
              </View>
              <TextInput
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="rgba(255,255,255,0.25)"
                className="text-right text-white font-bold flex-1 ml-4"
                style={{ fontSize: 24 }}
              />
            </GlassCard>

            <View className="flex-row gap-2 mt-3">
              {[50, 100, 250, 500].map((amt) => (
                <Pressable
                  key={amt}
                  onPress={() => setAmount(String(amt))}
                  className="flex-1 rounded-xl py-3 bg-neutral-950 border border-neutral-900 items-center justify-center"
                >
                  <Text className="text-white font-semibold" style={{ fontSize: 13 }}>
                    ${amt}
                  </Text>
                </Pressable>
              ))}
            </View>
          </AnimatedEntry>

          {/* CTA */}
          <AnimatedEntry delay={0.4} className="mb-12">
            <Pressable
              onPress={() => navigation.navigate("Transactions")}
              className="w-full items-center justify-center rounded-2xl"
              style={{ height: 56, backgroundColor: "#D9FF43" }}
            >
              <Text className="font-bold text-black" style={{ fontSize: 16 }}>
                Continue
              </Text>
            </Pressable>
          </AnimatedEntry>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AddMoney;
