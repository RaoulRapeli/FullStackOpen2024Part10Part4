import { Text, StyleSheet, Platform } from "react-native";
import theme from "../Text";
const styles = StyleSheet.create({
    text: {
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    }
});

const ReturnValueInThousands = ({ value }) => {
    const divideByThousend = value / 1000 >= 1 ? (`${(value / 1000).toFixed(1)}k`) : value
    return <Text style={styles.text}>
        {divideByThousend}
    </Text>
}
export default ReturnValueInThousands