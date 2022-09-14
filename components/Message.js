import { Text, View } from "react-native"

export const Message = ({user, content}) => {
    return (
        <View>
            <Text style={{ color: "orange" }}>{user}</Text>
            <Text style={{ color: "orange" }}>{content}</Text>
        </View>
    )
}

export default Message