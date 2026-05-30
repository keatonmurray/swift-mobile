import { View } from "react-native";

const GlassCard = ({ children, style, className = "" }) => {
  return (
    <View
      className={`overflow-hidden ${className}`}
      style={[
        {
          backgroundColor: "rgba(255,255,255,0.03)",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.08)",
          borderRadius: 20,
          padding: 14,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default GlassCard;
