import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "@firebase/database";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Message from "../components/Message";
import Icon from 'react-native-vector-icons/FontAwesome'

const HomeScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    onValue(ref(db, "chat"), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        let newMessages = [];

        Object.values(data).forEach((item) => newMessages.push(item));

        setMessages(newMessages);
      }
    });
  }, []);

  function createMessage() {
    const time = new Date().getTime();

    set(ref(db, `/chat/${time}`), {
      user: "Yuri",
      content: message,
    });

    setMessage("");
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.chat}
      >
        {messages.length > 0 &&
          messages.map((item, index) => (
            <Message key={index} user={item.user} content={item.content} />
          ))
        }
      </View>

      <View style={{display: 'flex', flexDirection: 'row', paddingHorizontal: 10, gap: 10}}>
        <TextInput
          style={styles.textInput}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={createMessage}>
          <Icon name='send-o' color='orange' size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 5,
    paddingBottom: 10,
    overflow: "hidden",
    maxHeight: "100%",
  },
  chat: {
    height: "80vh",
    width: "100%",
    overflow: "scroll",
  },
  textInput: {
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 4,
    height: 32,
    width: '100%'
  },
});

export default HomeScreen;
