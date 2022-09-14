import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { onValue, ref, set } from '@firebase/database';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';


const HomeScreen = ({ navigation }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    onValue(ref(db, 'chat'), snapshot => {
      const data = snapshot.val()


      if (data) {
        let newMessages = []

        Object.values(data).forEach(item => {
          console.log('item', item)
          newMessages.push(item)
        })

        setMessages(newMessages)
      }

    })
  }, [])

  function createMessage() {
    const time = new Date().getTime()

    set(ref(db, `/chat/${time}`), {
      'user': 'Yuri',
      'message': message
    })

    setMessage('')
  }

  return (
    <View style={styles.container}>
      {messages.map((item) => (
        <Text style={{ color: "orange" }}>{JSON.stringify(item)}</Text>
      ))}
      <Text style={{ color: "orange" }}>Mensagem!</Text>
      <TextInput
        style={styles.textInput}
        value={message}
        onChangeText={setMessage}
      />
      <Button
        style={styles.button}
        color="orange"
        title="Press me"
        onPress={createMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'orange',
    height: 24
  }
});

export default HomeScreen;
