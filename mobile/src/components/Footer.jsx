import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { House, RefreshCcw, User } from "lucide-react-native";
import { useEffect, useState } from "react";
import storage from "../utils/storage";
import { AnimatedEntry } from "../utils/animations";

const Footer = ({ active = "home" }) => {
  const navigation = useNavigation();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    storage.get("user_id").then(setUserId);
  }, []);

  const items = [
    {
      key: "home",
      label: "Home",
      icon: House,
      onPress: () => navigation.navigate("Dashboard", { id: userId }),
    },
    {
      key: "transactions",
      label: "Transactions",
      icon: () => (
        <View style={{ width: 22, height: 22, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 18 }}>📊</Text>
        </View>
      ),
      onPress: () => navigation.navigate("Transactions"),
    },
    {
      key: "convert",
      label: "Convert",
      icon: RefreshCcw,
      onPress: () => navigation.navigate("Convert"),
    },
    {
      key: "profile",
      label: "Profile",
      icon: User,
      onPress: () => {},
    },
  ];

  return (
    <View
      className="absolute bottom-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.08)",
      }}
    >
      <View className="flex-row justify-between items-center px-6 py-3" style={{ maxWidth: 430, alignSelf: "center", width: "100%" }}>
        {items.map((item) => {
          const isActive = active === item.key;
          const color = isActive ? "#D9FF43" : "rgba(255,255,255,0.45)";
          const IconComponent = item.icon;

          return (
            <Pressable
              key={item.key}
              onPress={item.onPress}
              className="items-center gap-1"
            >
              <IconComponent size={22} color={color} />
              <Text style={{ color, fontSize: 12 }}>{item.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Footer;
