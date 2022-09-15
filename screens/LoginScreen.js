import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import globalStyles from "../styles/global";
import IconMaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext} from '../App'

export const LoginScreen = () => {
  const [isRegister, setIsRegister] = useState(false)
  const { signIn, signUp } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onEnterClick() {
    if (isRegister) signUp({email, password})
    else signIn({email, password})
  }

  function onNewClick() {
    if (isRegister) setIsRegister(false)
    else setIsRegister(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {isRegister ?
            <IconMaterialCommunityIcons name="robot-excited" color="orange" size={50} />
            :
            <IconMaterialCommunityIcons name="robot" color="orange" size={50} />
          }
        </View>

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
              secureTextEntry={true}
              onChangeText={setPassword}
            />
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={onNewClick}>
                <Text style={globalStyles.text}>{isRegister ? 'Voltar' : 'Novo por aqui?'}</Text>
              </TouchableOpacity>
            </View>
        </View>
    
        <TouchableOpacity style={styles.button} onPress={onEnterClick}>
          <Text style={{ color: "orange", fontSize: 24 }}>{isRegister ? 'Registar' : 'Entrar'}</Text>
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
