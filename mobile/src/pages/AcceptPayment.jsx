import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CircleCheckBig, ShieldAlert, X } from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";
import GlassCard from "../components/GlassCard";
import ScreenHeader from "../components/ScreenHeader";

const AcceptPayment = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-grow px-5 pt-4 pb-12">
          {/* Header */}
          <AnimatedEntry delay={0}>
            <ScreenHeader title="Receive Money" onBack={() => navigation.goBack()} />
          </AnimatedEntry>

          {/* Verification Status */}
          <AnimatedEntry delay={0.1} className="items-center mb-6 mt-4">
            <View
              className="w-24 h-24 rounded-full items-center justify-center mb-4"
              style={{
                backgroundColor: "rgba(20,209,155,0.12)",
                borderWidth: 1,
                borderColor: "rgba(20,209,155,0.2)",
              }}
            >
              <CircleCheckBig size={48} color="#14D19B" />
            </View>
            <Text className="text-neutral-400 mb-1" style={{ fontSize: 14 }}>
              Money sent to you by
            </Text>
            <Text className="text-white font-bold text-center" style={{ fontSize: 28 }}>
              James Smith
            </Text>
          </AnimatedEntry>

          {/* Amount Card */}
          <AnimatedEntry delay={0.2} className="mb-5">
            <GlassCard className="p-6 border border-neutral-900 rounded-2xl items-center">
              <Text className="text-neutral-400 mb-1" style={{ fontSize: 13, textTransform: "uppercase" }}>
                You will receive
              </Text>
              <Text className="text-white font-bold mb-3" style={{ fontSize: 36, letterSpacing: -0.5 }}>
                $3,245.89
              </Text>
              <View
                className="flex-row items-center px-4 py-1.5 rounded-full bg-emerald-950/20 border border-neutral-800"
              >
                <CircleCheckBig size={16} color="#14D19B" className="mr-1.5" />
                <Text className="font-semibold text-emerald-400" style={{ fontSize: 12 }}>
                  Verified sender
                </Text>
              </View>
            </GlassCard>
          </AnimatedEntry>

          {/* Details Card */}
          <AnimatedEntry delay={0.3} className="mb-5">
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl">
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-neutral-400 mb-1" style={{ fontSize: 12 }}>
                    Sender
                  </Text>
                  <Text className="text-white font-bold" style={{ fontSize: 16 }}>
                    James Smith
                  </Text>
                </View>
                <View
                  className="w-12 h-12 rounded-full items-center justify-center"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                >
                  <Text className="text-white font-bold" style={{ fontSize: 14 }}>JS</Text>
                </View>
              </View>

              <View className="flex-row justify-between mb-3">
                <Text className="text-neutral-500" style={{ fontSize: 13 }}>Currency</Text>
                <Text className="text-white font-semibold" style={{ fontSize: 14 }}>EUR Account</Text>
              </View>

              <View className="flex-row justify-between mb-3">
                <Text className="text-neutral-500" style={{ fontSize: 13 }}>Fee</Text>
                <Text className="text-white font-semibold" style={{ fontSize: 14 }}>Free</Text>
              </View>

              <View className="flex-row justify-between">
                <Text className="text-neutral-500" style={{ fontSize: 13 }}>Estimated arrival</Text>
                <Text className="font-semibold" style={{ color: "#14D19B", fontSize: 14 }}>Instant</Text>
              </View>
            </GlassCard>
          </AnimatedEntry>

          {/* Message Card */}
          <AnimatedEntry delay={0.4} className="mb-6">
            <GlassCard className="p-4 border border-neutral-900 rounded-2xl">
              <Text className="text-neutral-500 mb-1" style={{ fontSize: 12 }}>
                Message from sender
              </Text>
              <Text className="text-white mt-1" style={{ fontSize: 14 }}>
                "Thank you so much for the dinner! Here is my share."
              </Text>
            </GlassCard>
          </AnimatedEntry>

          {/* CTA Buttons */}
          <AnimatedEntry delay={0.5} className="flex-col gap-3 mb-12">
            <Pressable
              onPress={() => navigation.navigate("Transactions")}
              className="w-full items-center justify-center rounded-2xl"
              style={{ height: 56, backgroundColor: "#D9FF43" }}
            >
              <Text className="font-bold text-black" style={{ fontSize: 16 }}>
                Accept Payment
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              className="w-full items-center justify-center rounded-2xl border border-neutral-900 bg-neutral-950"
              style={{ height: 54 }}
            >
              <Text className="text-white font-semibold" style={{ fontSize: 14 }}>
                Decline
              </Text>
            </Pressable>
          </AnimatedEntry>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AcceptPayment;
