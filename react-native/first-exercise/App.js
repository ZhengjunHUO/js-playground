import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ManageEvents } from "./screens/ManageEvents";
import { AllEvents } from "./screens/AllEvents";
import { RecentEvents } from "./screens/RecentEvents";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { IconButton } from "./components/UI/IconButton";
import { Provider } from "react-redux";
import { rdxStore } from "./store/rdx";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const Summary = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={18}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Management");
            }}
          />
        ),
      })}
    >
      <BottomTab.Screen
        name="All"
        component={AllEvents}
        options={{
          title: "All events",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Recent"
        component={RecentEvents}
        options={{
          title: "Recent events",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const ContentStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Summary"
        component={Summary}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Management"
        component={ManageEvents}
        options={{
          presentation: "modal",
        }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={rdxStore}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </Provider>
    </>
  );
}
