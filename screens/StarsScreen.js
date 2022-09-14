import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "@firebase/database";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Message from "../components/Message";
import IconAwesome from 'react-native-vector-icons/FontAwesome'

const HomeScreen = () => {
  const [messages, setMessages] = useState([]);

  const userId = 123

  useEffect(() => {
    onValue(ref(db, `users/${userId}/stars`), (snapshot) => {
      const data = snapshot.val();

      if (data) {
        let newMessages = [];

        Object.values(data).forEach((item) => newMessages.push(item));

        setMessages(newMessages.reverse());
      }
    });
  }, []);

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "space-between",
    gap: 10,
    paddingTop: 5,
    overflow: "hidden",
    maxHeight: "100%",
  },
  chat: {
    height: "85vh",
    width: "100%",
    overflow: "scroll",
    gap: 20,
    paddingHorizontal: 16
  },
  textInput: {
    color: 'orange',
    borderWidth: 2,
    borderColor: "orange",
    borderRadius: 10,
    height: 32,
    width: '100%',
    padding: 4
  },
});

export default HomeScreen;
