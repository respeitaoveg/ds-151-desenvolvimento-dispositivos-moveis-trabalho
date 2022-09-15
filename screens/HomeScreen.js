import { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "@firebase/database";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Message from "../components/Message";
import IconAwesome from "react-native-vector-icons/FontAwesome";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../App";

const HomeScreen = ({ navigation }) => {
  const { state, signOut } = useContext(AuthContext);

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
      userId: state.user.email,
      user: state.user.email,
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
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, maxHeight: 70 }}>
        <TouchableOpacity onPress={() => navigation.navigate('TopMessages')}>
          <IconMaterialCommunityIcons name="trophy-award" color="orange" size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <IconMaterialCommunityIcons name="robot" color="orange" size={40} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => signOut()}>
          <IconMaterialCommunityIcons name="exit-to-app" color="orange" size={30} />
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
    outlineStyle: 'none'
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
