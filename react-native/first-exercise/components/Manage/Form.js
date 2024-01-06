import { Text, View, StyleSheet } from "react-native";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

export const Form = ({ onCancel, onConfirm, buttonLabel, target }) => {
  const initInputs = {
    budget: {
      value: target ? target.budget.toString() : "",
      isValid: true,
    },
    date: {
      value: target ? target.date : "",
      isValid: true,
    },
    detail: {
      value: target ? target.detail : "",
      isValid: true,
    },
  };

  const [inputs, setInputs] = useState(initInputs);

  const changeHandler = (id, text) => {
    setInputs((prev) => {
      return {
        ...prev,
        [id]: { value: text, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const inputData = {
      budget: +inputs.budget.value,
      date: inputs.date.value,
      detail: inputs.detail.value,
    };

    const budgetIsValid = !isNaN(inputData.budget) && inputData.budget > 0;
    const dateIsValid = new Date(inputData.date).toString() !== "Invalid Date";
    const detailIsValid = inputData.detail.trim().length > 0;

    if (!budgetIsValid || !dateIsValid || !detailIsValid) {
      setInputs((prev) => {
        return {
          budget: { value: prev.budget.value, isValid: budgetIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          detail: { value: prev.detail.value, isValid: detailIsValid },
        };
      });
      return;
    }

    onConfirm(inputData);
  };

  const formIsValid =
    inputs.budget.isValid && inputs.date.isValid && inputs.detail.isValid;

  return (
    <View>
      <View style={styles.inputs}>
        <Input
          label="budget"
          type={styles.flex}
          valid={inputs.budget.isValid}
          inputConf={{
            keyboardType: "decimal-pad",
            onChangeText: changeHandler.bind(this, "budget"),
            value: inputs.budget.value,
          }}
        />
        <Input
          label="date"
          type={styles.flex}
          valid={inputs.date.isValid}
          inputConf={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: changeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="detail"
        valid={inputs.detail.isValid}
        inputConf={{
          multiline: true,
          onChangeText: changeHandler.bind(this, "detail"),
          value: inputs.detail.value,
        }}
      />
      {!formIsValid && <Text style={styles.errorMsg}> Invalid inputs !</Text>}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {buttonLabel}
        </Button>
      </View>
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
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginHorizontal: 10,
    minWidth: 50,
  },
  errorMsg: {
    fontSize: 20,
    color: GlobalStyles.colors.error500,
    textAlign: "center",
    margin: 5,
  },
});
