import { Text, TextInput, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

export const Input = ({ label, valid, inputConf, type }) => {
  const inputStyles = [styles.input];

  if (inputConf && inputConf.multiline) {
    inputStyles.push(styles.multiline);
  }

  if (!valid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, type]}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={[inputStyles, !valid && styles.invalidLabel]}
        {...inputConf}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  text: {
    fontSize: 15,
    color: GlobalStyles.colors.primary100,
    marginBottom: 3,
  },
  input: {
    fontSize: 20,
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 3,
    borderRadius: 5,
  },
  multiline: {
    textAlignVertical: "top",
    minHeight: 150,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
});
