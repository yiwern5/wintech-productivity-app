import {View, Pressable, StyleSheet} from "react-native";
import {Ionicons} from "@expo/vector-icons";

function IconButton({name, color, size, onPress}) {
  return (
    <Pressable onPress={onPress} style={({pressed}) => pressed && styles.buttonPress}>
        <View style={styles.iconContainer}>
            <Ionicons name={name} color={color} size={size}/>
        </View>
    </Pressable>
  )
};

const styles = StyleSheet.create({
    iconContainer: {
        backgroundColor: "black",
        borderBlockColor: "white",
        padding: 2,
        borderRadius: 10,
        // borderColor: "white",
        // borderWidth: 1,
        // marginVertical: 2,
        // marginHorizontal: 2
    },
    buttonPressed: {
        opacity: 0.75,
    }
});



export default IconButton