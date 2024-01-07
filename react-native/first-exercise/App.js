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
import { Provider, useDispatch, useSelector } from "react-redux";
import { rdxStore } from "./store/rdx";
import { Login } from "./screens/Login";
import { Signup } from "./screens/Signup";
import { Userspace } from "./screens/Userspace";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authAction } from "./store/auth";
import * as SplashScreen from "expo-splash-screen";

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
      <BottomTab.Screen
        name="User"
        component={Userspace}
        options={{
          title: "Userspace",
          tabBarLabel: "User",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
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

const Navigation = ({ onLayoutView }) => {
  const authInfo = useSelector((state) => state["auth"]);

  return (
    <NavigationContainer onReady={onLayoutView}>
      {!authInfo.isAuthed && <AuthStack />}
      {authInfo.isAuthed && <ContentStack />}
    </NavigationContainer>
  );
};

const Navig = () => {
  const [loadingToken, setLoadingToken] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        dispatch(authAction.authed(token));
      }

      setLoadingToken(false);
    };

    loadToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!loadingToken) {
      await SplashScreen.hideAsync();
    }
  }, [loadingToken]);

  if (loadingToken) {
    return null;
  }

  return <Navigation onLayoutView={onLayoutRootView} />;
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={rdxStore}>
        <Navig />
      </Provider>
    </>
  );
}
