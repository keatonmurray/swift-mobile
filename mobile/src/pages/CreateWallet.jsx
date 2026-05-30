import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "lucide-react-native";

const CreateWallet = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-black">
      <SafeAreaView className="flex-1 px-5 pt-4">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-8">
          <Pressable
            onPress={() => navigation.goBack()}
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
          >
            <ChevronLeft size={20} color="white" />
          </Pressable>
          <Text className="text-white font-semibold" style={{ fontSize: 18 }}>
            Create Wallet
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <View className="flex-1 items-center justify-center">
          <Text className="text-neutral-400 text-center" style={{ fontSize: 16 }}>
            Create Wallet screen{"\n"}coming soon
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreateWallet;
