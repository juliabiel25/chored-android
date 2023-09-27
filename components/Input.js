import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AssigneePicker from "./AssigneePicker";

const Input = ({ type, placeholder, onChange, value, label }) => {
  let input;
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  switch (type) {
    default:
    case "text":
    case "password": {
      input = (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          style={styles.textInput}
          secureTextEntry={type === "password"}
          onBlur={dismissKeyboard}
        />
      );
      break;
    }
    case "multiline": {
      input = (
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          style={[styles.textInput, styles.multilineInput]}
          multiline
          onBlur={dismissKeyboard}
        />
      );
      break;
    }
    case "datetime": {
      input = (
        <DateTimePicker value={value} mode="datetime" onChange={onChange} />
      );
      break;
    }
    case "assignee": {
      input = (
        <AssigneePicker
          value={value}
          onChange={onChange}
          style={styles.textInput}
        />
      );
      break;
    }
  }

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={styles.label}>{label}</Text>}
      {input}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  textInput: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "100%"
  },
  multilineInput: {
    height: 100,
    paddingVertical: 40
  },
  label: {
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: "#636262"
  }
});
