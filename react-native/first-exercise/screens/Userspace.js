import { View, StyleSheet } from "react-native";
import { Button } from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { authAction } from "../store/auth";
import { GlobalStyles } from "../constants/styles";

export const Userspace = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        onPress={() => dispatch(authAction.logout())}
      >
        Logout
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {},
});
