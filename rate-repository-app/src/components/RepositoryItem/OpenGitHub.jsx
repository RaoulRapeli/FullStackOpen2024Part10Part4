import { Text, StyleSheet, View, Platform, Pressable } from "react-native";
import theme from "../Text";
import * as Linking from 'expo-linking'
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
    flexRow: {
        ...theme.flexRow,
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    },
    button: {
        backgroundColor: theme.colors.blue,
        flexShrink: 1,
        flexGrow: 1,
        padding: 10,
        marginLeft:10,
        marginRight:10,
        fontSize: 16,
        borderRadius: 5,
        color: "white",
        textAlign: "center"
    }
});

const OpenGitHub = ({ repository }) => {
    return (
        <>
            <View style={styles.flexColumn}>
                <View style={{ ...styles.flexRow, flexGrow: 1, alignItems: 'center' }}>
                    <Pressable style={styles.button} onPress={() => WebBrowser.openBrowserAsync(repository.url)}>
                        <Text style={styles.button}>
                            Open in GitHub
                        </Text>
                    </Pressable>
                </View>
            </View>
        </>
    );
};

export default OpenGitHub