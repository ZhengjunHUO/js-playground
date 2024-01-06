import { View, StyleSheet } from "react-native";
import { Input } from "./Input";

export const Form = () => {
  return (
    <View>
      <View style={styles.inputs}>
        <Input
          label="budget"
          type={styles.flex}
          inputConf={{
            keyboardType: "decimal-pad",
            onChangeText: () => {},
          }}
        />
        <Input
          label="date"
          type={styles.flex}
          inputConf={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: () => {},
          }}
        />
      </View>
      <Input
        label="detail"
        inputConf={{
          multiline: true,
          onChangeText: () => {},
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
});
