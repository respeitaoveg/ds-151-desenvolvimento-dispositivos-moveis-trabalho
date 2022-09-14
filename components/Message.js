import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import globalStyles from "../styles/global";

export const Message = ({ userId, user, content, onPressStaredMessage }) => {
  const myUser = "Yuri";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <IconAwesome
            name={myUser === user ? "user" : "user-o"}
            color="orange"
            size={24}
          />
          <Text style={{ color: "orange", fontSize: 16 }}>{user}</Text>
        </View>

        <TouchableOpacity onPress={() => onPressStaredMessage({userId, user, content})}>
          <IconAntDesign name="star" color="orange" size={20} />
        </TouchableOpacity>
      </View>

      <Text style={globalStyles.text}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "orange",
    padding: 10,
    gap: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
});

export default Message;
