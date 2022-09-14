import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { db } from './firebase';
import { useEffect, useState } from 'react';
import { onValue, ref, set } from '@firebase/database';

export default function App() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    onValue(ref(db, 'chat'), snapshot => {
      const data = snapshot.val()


      if (data) {
        Object.values(data).forEach(item => {
          console.log('item', item)
          setMessages(oldItems => [...oldItems, item])
        })
      }

      console.log(messages)
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
    <SafeAreaProvider>
      <NavigationContainer>
        <View style={styles.container}>
          {messages.map(item => (
            <Text style={{color: 'orange'}}>{JSON.stringify(item)}</Text>
          ))}
          <Text style={{color: 'orange'}}>Mensagem!</Text>
          <TextInput style={styles.textInput} value={message} onChangeText={setMessage} />
          <Button
            style={styles.button}
            color='orange'
            title="Press me"
            onPress={createMessage}
          />
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

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
