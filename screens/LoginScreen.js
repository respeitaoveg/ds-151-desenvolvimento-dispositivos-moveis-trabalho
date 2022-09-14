import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../styles/global";
import IconMaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AuthContext} from '../App'

export const LoginScreen = () => {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <View style={{ gap: 15 }}>
          <View style={{gap: 4}}>
            <Text style={{color: 'orange', fontSize: 16}}>Email</Text>
            <TextInput
              style={globalStyles.textInput}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={{gap: 4}}>
            <Text style={{color: 'orange', fontSize: 16}}>Senha</Text>
            <TextInput
              style={globalStyles.textInput}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
    
        <TouchableOpacity style={styles.button} onPress={() => signIn({email, password})}>
          <Text style={{ color: "orange", fontSize: 24 }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    maxHeight: "100%",
  },
  login: {
    gap: 30,
    borderWidth: 2,
    borderColor: 'orange',
    padding: 20
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "orange",
    padding: 10
  }
});

export default LoginScreen;
