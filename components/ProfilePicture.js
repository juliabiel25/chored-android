import { StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@ui-kitten/components";

const ProfilePicture = ({ url }) => {
  return (
    <View style={styles.container}>
      {url ? (
        <>
          {/* <Image
          style={styles.profilePicture}
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png"
          }}
          /> */}
        </>
      ) : (
        <Icon style={styles.icon} fill="#fff" name="person-outline" />
      )}
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePicture: {},
  container: {
    borderRadius: 70,
    borderColor: "#fff",
    borderWidth: 8,
    width: 140,
    height: 140,
    display: "flex",
    padding: 15
  },
  icon: {
    width: "100%",
    height: "100%"
  }
});
