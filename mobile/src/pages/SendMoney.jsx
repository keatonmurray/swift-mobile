import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  ChevronLeft,
  CircleHelp,
  ChevronDown,
  ChevronRight,
  Shield,
  Landmark,
} from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";
import GlassCard from "../components/GlassCard";
import ScreenHeader from "../components/ScreenHeader";

const SendMoney = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-grow px-5 pt-4 pb-12">
          {/* Header */}
          <AnimatedEntry delay={0}>
            <ScreenHeader title="Send Money" onBack={() => navigation.goBack()} />
          </AnimatedEntry>

          {/* You Send */}
          <AnimatedEntry delay={0.1} className="mb-5">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              You send
            </Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text style={{ fontSize: 32 }}>🇺🇸</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-white font-bold" style={{ fontSize: 18 }}>USD</Text>
                  <ChevronDown size={16} color="gray" />
                </View>
              </View>
              <Text className="text-white font-light" style={{ fontSize: 28 }}>
                1,000.00
              </Text>
            </GlassCard>
            <Text className="text-neutral-500 mt-2" style={{ fontSize: 13 }}>
              Available balance: $12,456.78
            </Text>
          </AnimatedEntry>

          {/* They Receive */}
          <AnimatedEntry delay={0.2} className="mb-5">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              They receive
            </Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text style={{ fontSize: 32 }}>🇪🇺</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-white font-bold" style={{ fontSize: 18 }}>EUR</Text>
                  <ChevronDown size={16} color="gray" />
                </View>
              </View>
              <Text className="text-white font-light" style={{ fontSize: 28 }}>
                924.35
              </Text>
            </GlassCard>
            <View className="flex-row justify-between mt-2">
              <Text className="text-neutral-500" style={{ fontSize: 13 }}>
                1 USD = 0.9243 EUR
              </Text>
              <Text className="text-neutral-500" style={{ fontSize: 13 }}>
                Fee: $4.99
              </Text>
            </View>
          </AnimatedEntry>

          {/* Recipient */}
          <AnimatedEntry delay={0.3} className="mb-5">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              Recipient
            </Text>
            <Pressable onPress={() => navigation.navigate("Recipient")}>
              <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View
                    className="w-12 h-12 rounded-full items-center justify-center"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <Text className="text-white font-bold" style={{ fontSize: 16 }}>JS</Text>
                  </View>
                  <View>
                    <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                      James Smith
                    </Text>
                    <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 12 }}>
                      james.smith@email.com
                    </Text>
                  </View>
                </View>
                <ChevronRight color="gray" size={18} />
              </GlassCard>
            </Pressable>
          </AnimatedEntry>

          {/* Delivery Method */}
          <AnimatedEntry delay={0.4} className="mb-5">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              Delivery method
            </Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(217,255,67,0.08)" }}
                >
                  <Landmark color="#D9FF43" size={20} />
                </View>
                <View>
                  <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                    Bank Transfer
                  </Text>
                  <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 12 }}>
                    1–3 business days
                  </Text>
                </View>
              </View>
              <ChevronRight color="gray" size={18} />
            </GlassCard>
          </AnimatedEntry>

          {/* Reason for Transfer */}
          <AnimatedEntry delay={0.5} className="mb-6">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              Reason for transfer
            </Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                Family support
              </Text>
              <ChevronDown color="gray" size={18} />
            </GlassCard>
          </AnimatedEntry>

          {/* Security Banner */}
          <AnimatedEntry delay={0.6} className="mb-8">
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row items-center gap-3">
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(217,255,67,0.08)" }}
              >
                <Shield color="#D9FF43" size={22} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold" style={{ fontSize: 14 }}>
                  Secure & Encrypted
                </Text>
                <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 12 }}>
                  Your transfers are protected with bank-level encryption.
                </Text>
              </View>
            </GlassCard>
          </AnimatedEntry>

          {/* CTA */}
          <AnimatedEntry delay={0.7} className="mb-12">
            <Pressable
              onPress={() => navigation.navigate("Transactions")}
              className="w-full items-center justify-center rounded-2xl"
              style={{ height: 56, backgroundColor: "#D9FF43" }}
            >
              <Text className="font-bold text-black" style={{ fontSize: 16 }}>
                Review Transfer
              </Text>
            </Pressable>
          </AnimatedEntry>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SendMoney;
