import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "@firebase/database";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Message from "../components/Message";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import IconSimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { AuthContext } from "../App";

const HomeScreen = ({ navigation }) => {
  const { state, signOut } = useContext(AuthContext);
  console.log(111, state);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(ref(db, "chat"), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        let newMessages = [];

        Object.values(data).forEach((item) => newMessages.push(item));

        setMessages(newMessages.reverse());
      }
    });
  }, []);

  function onCreateMessage() {
    const time = new Date().getTime();

    set(ref(db, `/chat/${time}`), {
      id: time,
      userId: "123",
      user: "Yuri",
      likes: 0,
      content: message,
    });

    setMessage("");
  }

  function onPressLikeMessage(message) {
    message.likes++;

    set(ref(db, `/chat/${message.id}`), message);
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
      <TouchableOpacity>
        <IconSimpleLineIcons name="trophy" color="orange" size={30} />
      </TouchableOpacity>
      <TouchableOpacity>
        <IconMaterialCommunityIcons name="robot" color="orange" size={30} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => signOut()}>
        <IconMaterialIcons name="logout" color="orange" size={30} />
      </TouchableOpacity>
      </View>
      <View style={styles.chat}>
        {messages.length > 0 &&
          messages.map((item, index) => (
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

      <View
        style={styles.footer}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            width: "100%",
          }}
        >
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={onCreateMessage}
            returnKeyType="done"
          />
          <TouchableOpacity onPress={onCreateMessage}>
            <IconAwesome name="send-o" color="orange" size={30} />
          </TouchableOpacity>
        </View>
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
    height: "80vh",
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

export default HomeScreen;
