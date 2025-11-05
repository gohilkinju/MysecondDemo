import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { colors } from "../constants/colors"
import { scaleFont } from "../constants/responsive"
import fonts from "../assets/fonts/fonts"
import { strings } from "../constants/strings"

const profile:React.FC = () => {
    return (
         <ScrollView style={styles.container}>
     <StatusBar barStyle="light-content" backgroundColor="#303030" />
        
              <View style={styles.header}>
                <Text style={styles.title}>{strings.profile}</Text>
              </View>
              </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
      fontSize: scaleFont(22),
      fontWeight: "700",
      color: "#FF6B00",
      textAlign: "center",
      alignItems:'center',
      alignSelf: "center",
      fontFamily:fonts.name.regular,
    },
})
export default profile