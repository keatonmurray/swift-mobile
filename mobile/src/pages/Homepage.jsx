import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useMemo } from "react";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Plus,
} from "lucide-react-native";
import axios from "axios";
import storage from "../utils/storage";
import { API_BASE_URL } from "../utils/env";
import { AnimatedEntry } from "../utils/animations";
import GlassCard from "../components/GlassCard";

const FX_RATES = {
  USD: 1,
  AUD: 0.65,
  GBP: 1.27,
  CAD: 0.74,
  EUR: 1.08,
};

const Homepage = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const storedToken = await storage.get("api_token");
      const storedUserId = await storage.get("user_id");

      if (!storedToken) {
        navigation.navigate("Login");
        return;
      }

      setToken(storedToken);
      setUserId(storedUserId);
      fetchDashboardData(storedToken);
    };

    init();
  }, []);

  const fetchDashboardData = async (authToken) => {
    const authHeaders = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const [profileRes, walletRes, bankRes] = await Promise.allSettled([
        axios.get(`${API_BASE_URL}/api/profile`, authHeaders),
        axios.get(`${API_BASE_URL}/api/retrieve-personal-wallet`, authHeaders),
        axios.get(`${API_BASE_URL}/api/retrieve-personal-currency`, authHeaders),
      ]);

      if (profileRes.status === "fulfilled") {
        setUser(profileRes.value.data.user);
      }

      if (walletRes.status === "fulfilled") {
        setWallet(walletRes.value.data?.data?.wallet_rapyd ?? null);
      }

      if (bankRes.status === "fulfilled") {
        setBankAccounts(bankRes.value.data?.data?.wallet_rapyd?.bank_accounts ?? []);
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalBalance = useMemo(() => {
    return (
      wallet?.accounts?.reduce((sum, acc) => {
        const balance = Number(acc.balance || 0);
        const rate = FX_RATES?.[acc.currency] ?? 0;
        return sum + balance * rate;
      }, 0) || 0
    );
  }, [wallet]);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance);

  const actionButtons = [
    {
      icon: <ArrowUpRight size={28} className="text-lime" style={{ color: "#D9FF43" }} />,
      title: "Send",
      subtitle: "Send money",
      path: "SendMoney",
    },
    {
      icon: <ArrowDownLeft size={28} className="text-lime" style={{ color: "#D9FF43" }} />,
      title: "Receive",
      subtitle: "Receive money",
      path: "ReceiveMoney",
    },
    {
      icon: <ArrowLeftRight size={26} className="text-lime" style={{ color: "#D9FF43" }} />,
      title: "Currency",
      subtitle: "Open wallet",
      path: "CreateWallet",
    },
    {
      icon: <Plus size={28} className="text-lime" style={{ color: "#D9FF43" }} />,
      title: "Add Money",
      subtitle: "Deposit funds",
      path: "AddMoney",
    },
  ];

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-grow px-5 pt-4 pb-12">
          {/* Top Bar */}
          <AnimatedEntry delay={0} className="flex-row justify-between items-center mb-6">
            <Image
              source={require("../../assets/icon.png")}
              style={{ width: 34, height: 34, resizeMode: "contain" }}
            />
            <View className="flex-row items-center gap-3">
              <Pressable
                onPress={() => navigation.navigate("Transactions")}
                className="w-10 h-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800"
              >
                <Bell size={20} color="white" />
              </Pressable>
              <View
                className="w-10 h-10 rounded-full bg-lime items-center justify-center"
                style={{ backgroundColor: "#D9FF43" }}
              >
                <Text className="font-bold text-black" style={{ fontSize: 14 }}>
                  {user?.first_name?.[0]?.toUpperCase() || ""}
                  {user?.last_name?.[0]?.toUpperCase() || ""}
                </Text>
              </View>
            </View>
          </AnimatedEntry>

          {/* Welcome Message */}
          <AnimatedEntry delay={0.1} className="mb-6">
            <Text className="text-neutral-400" style={{ fontSize: 16 }}>
              Welcome,
            </Text>
            <Text className="text-white font-bold mt-1" style={{ fontSize: 32, letterSpacing: -0.5 }}>
              {user?.first_name || "User"}
            </Text>
          </AnimatedEntry>

          {/* Balance Card */}
          <AnimatedEntry delay={0.2} className="mb-6">
            <GlassCard className="p-5 border border-neutral-800 rounded-3xl relative overflow-hidden">
              <Text className="text-neutral-400 mb-2" style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 0.5 }}>
                Total Balance
              </Text>
              <View className="flex-row items-baseline gap-2">
                <Text className="text-white font-bold" style={{ fontSize: 36, letterSpacing: -1 }}>
                  {loading ? "Loading..." : formattedTotal}
                </Text>
                <View className="flex-row items-center gap-1">
                  <Text className="text-neutral-400 font-semibold" style={{ fontSize: 14 }}>USD</Text>
                  <ChevronDown size={14} color="gray" />
                </View>
              </View>
            </GlassCard>
          </AnimatedEntry>

          {/* Quick Action Grid */}
          <AnimatedEntry delay={0.3} className="flex-row flex-wrap justify-between gap-y-3 mb-6">
            {actionButtons.map((btn, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(btn.path)}
                className="w-[48%]"
              >
                <GlassCard className="p-4 rounded-2xl border border-neutral-900 flex-col justify-between h-28">
                  <View className="mb-2">{btn.icon}</View>
                  <View>
                    <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                      {btn.title}
                    </Text>
                    <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 11 }}>
                      {btn.subtitle}
                    </Text>
                  </View>
                </GlassCard>
              </Pressable>
            ))}
          </AnimatedEntry>

          {/* Currencies Section */}
          <AnimatedEntry delay={0.4} className="mb-6">
            <GlassCard className="rounded-3xl border border-neutral-900 overflow-hidden">
              <View className="flex-row justify-between items-center p-4 border-b border-neutral-900">
                <Text className="text-white font-semibold" style={{ fontSize: 16 }}>
                  Your Currencies
                </Text>
                <Pressable onPress={() => navigation.navigate("Transactions")}>
                  <Text style={{ color: "#D9FF43", fontWeight: "600", fontSize: 14 }}>
                    View all
                  </Text>
                </Pressable>
              </View>

              {loading ? (
                <View className="py-6 items-center">
                  <Text className="text-neutral-400">Loading currencies...</Text>
                </View>
              ) : bankAccounts?.length ? (
                bankAccounts.map((acc, index) => {
                  const walletAccount = wallet?.accounts?.find((a) => a.currency === acc.currency);
                  return (
                    <View
                      key={index}
                      className={`flex-row justify-between items-center p-4 ${
                        index !== bankAccounts.length - 1 ? "border-b border-neutral-900" : ""
                      }`}
                    >
                      <View>
                        <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                          {acc.currency} Account
                        </Text>
                        <Text className="text-neutral-500 mt-1" style={{ fontSize: 12 }}>
                          Available currency wallet
                        </Text>
                      </View>
                      <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                        {walletAccount?.balance || "0.00"} {acc.currency}
                      </Text>
                    </View>
                  );
                })
              ) : (
                <View className="py-6 items-center">
                  <Text className="text-neutral-500">No active currencies yet.</Text>
                </View>
              )}
            </GlassCard>
          </AnimatedEntry>

          {/* Security Card */}
          <AnimatedEntry delay={0.5} className="mb-12">
            <GlassCard className="p-4 rounded-3xl border border-neutral-950 flex-row justify-between items-center">
              <View className="flex-row items-center gap-3 flex-1 pr-4">
                <View className="w-10 h-10 rounded-full bg-lime/10 items-center justify-center" style={{ backgroundColor: "rgba(217,255,67,0.08)" }}>
                  <Text style={{ fontSize: 18 }}>🛡️</Text>
                </View>
                <View className="flex-1">
                  <Text className="text-white font-semibold" style={{ fontSize: 15 }}>
                    Secure. Fast. Global.
                  </Text>
                  <Text className="text-neutral-500 mt-0.5" style={{ fontSize: 12 }}>
                    Move your money globally with full confidence.
                  </Text>
                </View>
              </View>
              <ChevronRight color="gray" size={18} />
            </GlassCard>
          </AnimatedEntry>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Homepage;
