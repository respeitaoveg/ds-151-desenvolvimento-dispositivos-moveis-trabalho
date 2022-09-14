import { useEffect, useState } from "react";
import { db } from "../firebase";
import { onValue, ref, set } from "@firebase/database";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Message from "../components/Message";
import IconAwesome from 'react-native-vector-icons/FontAwesome'

const HomeScreen = () => {

  const userId = 123

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
      userId: '123',
      user: "Yuri",
      content: message,
    });

    setMessage("");
  }

  function onPressStaredMessage(message) {
    const time = new Date().getTime();

    console.log(message)

    set(ref(db, `users/${userId}/${time}`), message);
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.chat}
      >
        {messages.length > 0 &&
          messages.map((item, index) => (
            <Message 
              key={index} 
              userId={item.userId}
              user={item.user} 
              content={item.content} 
              onPressStaredMessage={onPressStaredMessage}
            />
          ))
        }
      </View>

      <View style={{flex:1, height:'100%', width: '100%', justifyContent: 'center', paddingHorizontal: 16}}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10, width: '100%'}}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={onCreateMessage}
            returnKeyType='done'
          />
          <TouchableOpacity onPress={onCreateMessage}>
            <IconAwesome name='send-o' color='orange' size={30} />
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
