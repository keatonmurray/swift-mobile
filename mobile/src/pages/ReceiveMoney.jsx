import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  ChevronLeft,
  CircleHelp,
  ChevronDown,
  ChevronRight,
} from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";
import GlassCard from "../components/GlassCard";
import ScreenHeader from "../components/ScreenHeader";

const ReceiveMoney = () => {
  const navigation = useNavigation();
  const [filter, setFilter] = useState("All");

  const transactions = [
    {
      day: "Today",
      items: [
        {
          initials: "JS",
          flag: "🇪🇺",
          name: "James Smith",
          amount: "+€924.35",
          path: "AcceptPayment",
        },
        {
          initials: "AW",
          flag: "🇺🇸",
          name: "Anna Williams",
          amount: "+$150.00",
          path: "AcceptPayment",
        },
        {
          initials: "MR",
          flag: "🇬🇧",
          name: "Michael Roberts",
          amount: "+£320.50",
          path: "AcceptPayment",
        },
      ],
    },
    {
      day: "Yesterday",
      items: [
        {
          initials: "SC",
          flag: "🇨🇦",
          name: "Sophie Chen",
          amount: "+$75.20",
        },
        {
          initials: "DL",
          flag: "🇦🇺",
          name: "David Lee",
          amount: "+$200.00",
        },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-grow px-5 pt-4 pb-12">
          {/* Header */}
          <AnimatedEntry delay={0}>
            <ScreenHeader title="Receive Money" onBack={() => navigation.goBack()} />
          </AnimatedEntry>

          {/* Total Received Card */}
          <AnimatedEntry delay={0.1} className="mb-6">
            <Text className="text-neutral-400 mb-2" style={{ fontSize: 14 }}>
              Total received
            </Text>
            <View className="flex-row items-baseline gap-3 mb-2">
              <Text className="text-white font-bold" style={{ fontSize: 34, letterSpacing: -0.5 }}>
                $3,245.89
              </Text>
              <GlassCard className="px-3 py-1 rounded-full border border-neutral-900 flex-row items-center gap-1">
                <Text className="text-white font-semibold" style={{ fontSize: 12 }}>This month</Text>
                <ChevronDown size={14} color="white" />
              </GlassCard>
            </View>
            <Text className="text-neutral-500" style={{ fontSize: 13 }}>
              <Text style={{ color: "#14D19B" }}>↑</Text> $520.40 more than last month
            </Text>
          </AnimatedEntry>

          {/* Filters */}
          <AnimatedEntry delay={0.2} className="flex-row gap-2 mb-6">
            {["All", "Received", "Pending"].map((f) => {
              const active = filter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setFilter(f)}
                  className="rounded-full px-5 py-2.5 items-center justify-center"
                  style={{
                    backgroundColor: active ? "#D9FF43" : "rgba(255,255,255,0.03)",
                    borderWidth: 1,
                    borderColor: active ? "#D9FF43" : "rgba(255,255,255,0.06)",
                  }}
                >
                  <Text
                    className="font-semibold"
                    style={{
                      color: active ? "#000" : "#fff",
                      fontSize: 13,
                    }}
                  >
                    {f}
                  </Text>
                </Pressable>
              );
            })}
          </AnimatedEntry>

          {/* Transactions Group */}
          <AnimatedEntry delay={0.3} className="mb-8">
            {transactions.map((group, groupIndex) => (
              <View key={groupIndex} className="mb-6">
                <Text className="text-neutral-500 mb-3 font-semibold" style={{ fontSize: 13 }}>
                  {group.day}
                </Text>
                <View className="flex-col gap-2">
                  {group.items.map((item, index) => (
                    <Pressable
                      key={index}
                      onPress={() => item.path && navigation.navigate(item.path)}
                    >
                      <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row justify-between items-center">
                        <View className="flex-row items-center gap-3">
                          <View className="relative">
                            <View
                              className="w-12 h-12 rounded-full items-center justify-center bg-neutral-900 border border-neutral-800"
                            >
                              <Text className="text-white font-bold" style={{ fontSize: 14 }}>
                                {item.initials}
                              </Text>
                            </View>
                            <View
                              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-neutral-950 items-center justify-center border border-neutral-900"
                            >
                              <Text style={{ fontSize: 11 }}>{item.flag}</Text>
                            </View>
                          </View>
                          <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                            {item.name}
                          </Text>
                        </View>
                        <View className="flex-row items-center gap-3">
                          <View className="items-end">
                            <Text className="font-bold" style={{ color: "#14D19B", fontSize: 14 }}>
                              {item.amount}
                            </Text>
                            <Text style={{ color: "#14D19B", fontSize: 11, marginTop: 1 }}>
                              Received
                            </Text>
                          </View>
                          <ChevronRight color="gray" size={16} />
                        </View>
                      </GlassCard>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </AnimatedEntry>

          {/* Load More */}
          <AnimatedEntry delay={0.4} className="mb-12">
            <Pressable className="w-full items-center justify-center rounded-2xl border border-neutral-900 bg-neutral-950" style={{ height: 54 }}>
              <Text className="text-white font-semibold" style={{ fontSize: 14 }}>
                Load more
              </Text>
            </Pressable>
          </AnimatedEntry>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ReceiveMoney;
