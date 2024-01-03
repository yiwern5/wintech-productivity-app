import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({children, onPress, mode, style}) {
  return (
    <View style={style}>
        <Pressable onPress={onPress} style={({pressed}) => pressed && styles.buttonPressed}>
            <View style={[styles.buttonContainer, mode === "flat" && styles.flat]}>
                <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}> {children} </Text>
            </View>
        </Pressable>
    </View>
  )
};

const styles = StyleSheet.create({
   buttonContainer: {
       padding: 6,
       borderRadius: 10,
       backgroundColor: GlobalStyles.colors.cherry,
   },
   flat: {
       backgroundColor: GlobalStyles.colors.pink,
   },
   buttonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
   },
   flatText: {
       color: "black",
   },
   buttonPressed: {
       opacity: 0.75,
       backgroundColor: "white",
       borderRadius: 5,
   }
});

export default Button