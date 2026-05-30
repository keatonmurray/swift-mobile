import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft, CircleHelp } from "lucide-react-native";
import { AnimatedEntry } from "../utils/animations";

const ScreenHeader = ({ title, backRoute, backParams, showHelp = true }) => {
  const navigation = useNavigation();

  return (
    <AnimatedEntry delay={0} className="flex-row justify-between items-center mb-6">
      <Pressable
        onPress={() =>
          backRoute
            ? navigation.navigate(backRoute, backParams)
            : navigation.goBack()
        }
        className="items-center justify-center rounded-full"
        style={{
          width: 60,
          height: 60,
          backgroundColor: "rgba(255,255,255,0.05)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <ChevronLeft size={18} color="white" />
      </Pressable>

      <Text className="text-white font-semibold text-lg">{title}</Text>

      {showHelp ? (
        <Pressable
          className="items-center justify-center rounded-full"
          style={{
            width: 60,
            height: 60,
            backgroundColor: "rgba(255,255,255,0.05)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          <CircleHelp size={18} color="white" />
        </Pressable>
      ) : (
        <View style={{ width: 60 }} />
      )}
    </AnimatedEntry>
  );
};

export default ScreenHeader;
