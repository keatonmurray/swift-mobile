import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import {
  ChevronLeft,
  CircleHelp,
  ChevronDown,
  Shield,
} from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";
import GlassCard from "../components/GlassCard";
import ScreenHeader from "../components/ScreenHeader";

const Recipient = () => {
  const navigation = useNavigation();
  const [type, setType] = useState("E-wallet");
  const [provider, setProvider] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");

  const inputContainerStyle = {
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.05)",
  };

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-grow px-5 pt-4 pb-12" keyboardShouldPersistTaps="handled">
          {/* Header */}
          <AnimatedEntry delay={0}>
            <ScreenHeader title="Recipient" onBack={() => navigation.goBack()} />
          </AnimatedEntry>

          {/* Transfer Type Selector */}
          <AnimatedEntry delay={0.1} className="mb-6 mt-4">
            <Text className="text-neutral-400 mb-3" style={{ fontSize: 14 }}>
              Choose transfer type
            </Text>
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setType("E-wallet")}
                className="flex-1"
              >
                <GlassCard
                  className="p-4 rounded-2xl"
                  style={{
                    borderWidth: 1,
                    borderColor: type === "E-wallet" ? "#D9FF43" : "rgba(255,255,255,0.06)",
                  }}
                >
                  <Text className="font-semibold" style={{ color: type === "E-wallet" ? "#D9FF43" : "#fff", fontSize: 15 }}>
                    E-wallet
                  </Text>
                  <Text className="text-neutral-500 mt-1" style={{ fontSize: 12 }}>
                    Send to e-wallet
                  </Text>
                </GlassCard>
              </Pressable>

              <Pressable
                onPress={() => setType("Bank")}
                className="flex-1"
              >
                <GlassCard
                  className="p-4 rounded-2xl"
                  style={{
                    borderWidth: 1,
                    borderColor: type === "Bank" ? "#D9FF43" : "rgba(255,255,255,0.06)",
                  }}
                >
                  <Text className="font-semibold" style={{ color: type === "Bank" ? "#D9FF43" : "#fff", fontSize: 15 }}>
                    Direct to bank
                  </Text>
                  <Text className="text-neutral-500 mt-1" style={{ fontSize: 12 }}>
                    Send to bank
                  </Text>
                </GlassCard>
              </Pressable>
            </View>
          </AnimatedEntry>

          {/* E-Wallet Details */}
          <AnimatedEntry delay={0.2} className="mb-6">
            <Text className="text-white font-semibold mb-4" style={{ fontSize: 18 }}>
              {type} details
            </Text>

            {/* Provider */}
            <View className="mb-4">
              <Text className="text-neutral-400 mb-2" style={{ fontSize: 13 }}>
                {type} provider
              </Text>
              <View className="flex-row items-center justify-between px-3" style={inputContainerStyle}>
                <TextInput
                  value={provider}
                  onChangeText={setProvider}
                  placeholder={`Select ${type.toLowerCase()} provider`}
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  className="flex-1 text-white"
                  style={{ fontSize: 15 }}
                />
                <ChevronDown size={18} color="gray" />
              </View>
            </View>

            {/* Mobile Number */}
            <View className="mb-4">
              <Text className="text-neutral-400 mb-2" style={{ fontSize: 13 }}>
                Mobile number
              </Text>
              <View className="flex-row items-center px-3 gap-2" style={inputContainerStyle}>
                <Text style={{ fontSize: 18 }}>🇵🇭</Text>
                <Text className="text-white font-semibold" style={{ fontSize: 15 }}>+63</Text>
                <ChevronDown size={14} color="gray" />
                <View className="w-[1] h-6 bg-neutral-800 mx-1" />
                <TextInput
                  value={mobileNumber}
                  onChangeText={setMobileNumber}
                  keyboardType="phone-pad"
                  placeholder="912 345 6789"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  className="flex-1 text-white"
                  style={{ fontSize: 15 }}
                />
              </View>
            </View>

            {/* Recipient Name */}
            <View className="mb-4">
              <Text className="text-neutral-400 mb-2" style={{ fontSize: 13 }}>
                Recipient name
              </Text>
              <View className="flex-row items-center px-3" style={inputContainerStyle}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Full name as shown on account"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  className="flex-1 text-white"
                  style={{ fontSize: 15 }}
                />
              </View>
            </View>

            {/* Nickname */}
            <View className="mb-6">
              <Text className="text-neutral-400 mb-2" style={{ fontSize: 13 }}>
                Nickname (optional)
              </Text>
              <View className="flex-row items-center px-3" style={inputContainerStyle}>
                <TextInput
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="Easier to find next time"
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  className="flex-1 text-white"
                  style={{ fontSize: 15 }}
                />
              </View>
            </View>
          </AnimatedEntry>

          {/* Security Banner */}
          <AnimatedEntry delay={0.3} className="mb-8">
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl flex-row items-center gap-3">
              <View
                className="w-12 h-12 rounded-full items-center justify-center"
                style={{ backgroundColor: "rgba(217,255,67,0.08)" }}
              >
                <Shield color="#D9FF43" size={22} />
              </View>
              <View className="flex-1">
                <Text className="text-white font-semibold" style={{ fontSize: 14 }}>
                  Your transfers are secure
                </Text>
                <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 12 }}>
                  We use bank-level encryption to keep your transaction details perfectly safe.
                </Text>
              </View>
            </GlassCard>
          </AnimatedEntry>

          {/* Button */}
          <AnimatedEntry delay={0.4} className="mb-12">
            <Pressable
              onPress={() => navigation.navigate("SendMoney")}
              className="w-full items-center justify-center rounded-2xl"
              style={{ height: 56, backgroundColor: "#D9FF43" }}
            >
              <Text className="font-bold text-black" style={{ fontSize: 16 }}>
                Save Recipient
              </Text>
            </Pressable>
          </AnimatedEntry>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Recipient;
