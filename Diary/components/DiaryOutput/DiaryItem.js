import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function DiaryItem({ id, title, entry, date, image }) {
    const navigation = useNavigation();

    function diaryPressHandler() {
        navigation.navigate("ManageDiary", {
            diaryId: id,
        });
    }

    return (
        <Pressable
            onPress={diaryPressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.DiaryItem}>
                <View>
                    <Text style={[styles.textBase, styles.title]}>
                        {title}
                    </Text>
                    <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
                    <Text style={[styles.textBase, styles.entry]}>{entry}</Text>
                    <Image style={styles.image} source={{uri: image}} />
                </View>
            </View>
        </Pressable>
    );
}

export default DiaryItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    DiaryItem: {
        padding: 10,
        marginVertical: 8,
        borderRadius: 12,
        backgroundColor: GlobalStyles.colors.pink,
        elevation: 4,
        shadowColor: GlobalStyles.colors.thistle,
        shadowOffset: {width: 1, height: 1},
        shadowRadius: 4,
        shadowOpacity: 0.5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    textBase: {
        fontSize: 14,
        color: "black",
        marginRight: 100
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16
    },
    entry: {
        marginTop: 8
    },
    image: {
        height:160, 
        width:'100%', 
        borderTopLeftRadius:15, 
        borderTopRightRadius:15
      },
});
