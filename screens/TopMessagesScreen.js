import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "@firebase/database";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Message from "../components/Message";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../App";
import _ from "lodash";

const TopMessagesScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [topMessages, setTopMessages] = useState([]);

  useEffect(() => {
    onValue(ref(db, "chat"), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        let newMessages = [];

        Object.values(data).forEach((item) => newMessages.push(item));

        setMessages(newMessages.reverse());
      }
    })
  }, []);

  useEffect(() => {
    const aux = _.chain(messages)
    .sortBy("likes")
    .reverse()
    .take(5)
    .value();

    setTopMessages(aux)
  });

  function onPressLikeMessage() {}

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          maxHeight: 70,
        }}
      >
        <TouchableOpacity>
          <IconMaterialCommunityIcons
            name="trophy-award"
            color="orange"
            size={30}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Sala")}>
          <IconMaterialCommunityIcons name="robot" color="orange" size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()}>
          <IconMaterialCommunityIcons
            name="exit-to-app"
            color="orange"
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.chat}>
        {topMessages.length > 0 &&
          topMessages.map((item, index) => (
            <Message
              key={index}
              id={item.id}
              userId={item.userId}
              user={item.user}
              content={item.content}
              likes={item.likes}
              onPressLikeMessage={onPressLikeMessage}
            />
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
    gap: 10,
    overflow: "hidden",
    maxHeight: "100%",
  },
  chat: {
    flex: 1,
    width: "100%",
    overflow: "scroll",
    gap: 20,
    paddingHorizontal: 16,
  },
  textInput: {
    color: "orange",
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 10,
    height: 32,
    width: "100%",
    padding: 4,
  },
  footer: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
});

export default TopMessagesScreen;
