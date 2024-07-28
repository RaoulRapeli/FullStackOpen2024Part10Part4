import { Text, Image, StyleSheet, View, Platform } from "react-native";
import theme from "../Text";

const styles = StyleSheet.create({
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    h1: {
        fontWeight: 'bold',
        fontSize: 18,fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    },
    basicText: {
        fontSize: 16,
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    },
    flexRow: {
        ...theme.flexRow,
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    },
    flexColumn: {
        ...theme.flexColumn,
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    }
});

const Header = ({ repository }) => {
    return (
        <View style={{ ...styles.flexRow, columnGap: 10 }}>
            <View>
                <Image
                    style={styles.profilePicture}
                    source={{
                        uri: repository.ownerAvatarUrl,
                    }}
                />
            </View>
            <View style={{ ...styles.flexColumn, flexShrink: 1 }}>
                <Text style={styles.h1} testID="repositoryItemFullName">{repository.fullName}</Text>
                <Text style={styles.basicText}>{repository.description}</Text>
                <View style={{ ...styles.flexRow, columnGap: 10 }}>
                    <Text style={{ flexShrink: 1, padding: 5, borderRadius: 5, backgroundColor: theme.colors.blue, color: "white" }}>
                        {repository.language}
                    </Text>
                    <Text style={{ flexGrow: 4 }}></Text>
                </View>
            </View>
        </View>
    );
};

export default Header;