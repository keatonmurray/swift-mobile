import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Homepage from "../pages/Homepage";
import SendMoney from "../pages/SendMoney";
import ReceiveMoney from "../pages/ReceiveMoney";
import Recipient from "../pages/Recipient";
import AcceptPayment from "../pages/AcceptPayment";
import AddMoney from "../pages/AddMoney";
import Convert from "../pages/Convert";
import CreateWallet from "../pages/CreateWallet";
import SelectAccountType from "../pages/SelectAccountType";
import Transactions from "../pages/Transactions";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#000" },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Dashboard" component={Homepage} />
        <Stack.Screen name="SendMoney" component={SendMoney} />
        <Stack.Screen name="ReceiveMoney" component={ReceiveMoney} />
        <Stack.Screen name="Recipient" component={Recipient} />
        <Stack.Screen name="AcceptPayment" component={AcceptPayment} />
        <Stack.Screen name="AddMoney" component={AddMoney} />
        <Stack.Screen name="Convert" component={Convert} />
        <Stack.Screen name="CreateWallet" component={CreateWallet} />
        <Stack.Screen name="SelectAccountType" component={SelectAccountType} />
        <Stack.Screen name="Transactions" component={Transactions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
