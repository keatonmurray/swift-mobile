import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  ChevronLeft,
  CircleHelp,
  ChevronDown,
  ArrowUpDown,
  Info,
  Clock3,
} from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";
import GlassCard from "../components/GlassCard";
import ScreenHeader from "../components/ScreenHeader";

const Convert = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-grow px-5 pt-4 pb-12">
          {/* Header */}
          <AnimatedEntry delay={0}>
            <ScreenHeader title="Convert" onBack={() => navigation.goBack()} />
          </AnimatedEntry>

          {/* From */}
          <AnimatedEntry delay={0.1} className="mb-2 mt-4">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>From</Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text style={{ fontSize: 32 }}>🇺🇸</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-white font-bold" style={{ fontSize: 16 }}>USD</Text>
                  <ChevronDown size={16} color="gray" />
                </View>
              </View>
              <Text className="text-white font-light" style={{ fontSize: 26 }}>1,000.00</Text>
            </GlassCard>
          </AnimatedEntry>

          {/* Swap Indicator */}
          <AnimatedEntry delay={0.15} className="items-center z-10 -my-2">
            <View
              className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 items-center justify-center shadow-lg"
            >
              <ArrowUpDown size={18} color="#D9FF43" />
            </View>
          </AnimatedEntry>

          {/* To */}
          <AnimatedEntry delay={0.2} className="mb-4">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>To</Text>
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <Text style={{ fontSize: 32 }}>🇪🇺</Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-white font-bold" style={{ fontSize: 16 }}>EUR</Text>
                  <ChevronDown size={16} color="gray" />
                </View>
              </View>
              <Text className="text-white font-light" style={{ fontSize: 26 }}>924.35</Text>
            </GlassCard>
          </AnimatedEntry>

          {/* FX Rates */}
          <AnimatedEntry delay={0.25} className="flex-row justify-between items-center mb-5 px-1">
            <View className="flex-row items-center gap-1">
              <Text className="text-neutral-500" style={{ fontSize: 13 }}>
                1 USD = 0.9243 EUR
              </Text>
              <Info size={14} color="gray" />
            </View>
            <View className="flex-row items-center gap-1">
              <Text style={{ color: "#D9FF43", fontSize: 13, fontWeight: "500" }}>
                Rate updates in 45s
              </Text>
              <Clock3 size={14} color="#D9FF43" />
            </View>
          </AnimatedEntry>

          {/* Cost details */}
          <AnimatedEntry delay={0.3} className="mb-6">
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl">
              <View className="flex-row justify-between mb-3">
                <Text className="text-neutral-500" style={{ fontSize: 13 }}>Exchange rate</Text>
                <Text className="text-white font-semibold" style={{ fontSize: 14 }}>1 USD = 0.9243 EUR</Text>
              </View>
              <View className="flex-row justify-between mb-3">
                <Text className="text-neutral-500" style={{ fontSize: 13 }}>Fee</Text>
                <Text className="text-white font-semibold" style={{ fontSize: 14 }}>$4.99 USD</Text>
              </View>
              <View className="h-[1] bg-neutral-900 my-3" />
              <View className="flex-row justify-between mb-3">
                <Text className="text-neutral-500" style={{ fontSize: 13 }}>You will receive</Text>
                <Text className="font-bold" style={{ color: "#D9FF43", fontSize: 16 }}>€924.35</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-neutral-500" style={{ fontSize: 13 }}>You save</Text>
                <Text className="font-semibold" style={{ color: "#D9FF43", fontSize: 13 }}>
                  $12.36 vs other providers
                </Text>
              </View>
            </GlassCard>
          </AnimatedEntry>

          {/* CTA */}
          <AnimatedEntry delay={0.4} className="mb-12">
            <Pressable
              onPress={() => navigation.navigate("Transactions")}
              className="w-full items-center justify-center rounded-2xl"
              style={{ height: 56, backgroundColor: "#D9FF43" }}
            >
              <Text className="font-bold text-black" style={{ fontSize: 16 }}>
                Review Conversion
              </Text>
            </Pressable>
          </AnimatedEntry>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Convert;
