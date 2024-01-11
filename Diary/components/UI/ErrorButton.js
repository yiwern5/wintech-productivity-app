import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ErrorButton({children, onPress, mode, style}) {
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
    padding: 5,
    borderRadius: 10,
    backgroundColor: GlobalStyles.colors.crimson,
   },
   flat: {
    backgroundColor: GlobalStyles.colors.crimson,
   },
   buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "left",
   },
   flatText: {
    color: "black",
   },
   buttonPressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.cherry,
    borderRadius: 10,
   }
});

export default ErrorButton