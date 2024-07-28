import { Text, StyleSheet, View, Platform} from "react-native";
import theme from "../Text";
import ReturnValueInThousands from "./ReturnValueInThousands";

const styles = StyleSheet.create({
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

const Statistics = ({ repository }) => {
    return (
        <>
            <View style={styles.flexRow}>
                <View style={{ ...styles.flexColumn, flexGrow: 1, alignItems: 'center' }}>
                    <Text>
                        <ReturnValueInThousands value={repository.stargazersCount} />
                    </Text>
                    <Text>Stars</Text>
                </View>
                <View style={{ ...styles.flexColumn, flexGrow: 1, alignItems: 'center' }}>
                    <Text>
                        <ReturnValueInThousands value={repository.forksCount} />
                    </Text>
                    <Text>Forks</Text>
                </View>
                <View style={{ ...styles.flexColumn, flexGrow: 1, alignItems: 'center' }}>
                    <Text>
                        <ReturnValueInThousands value={repository.reviewCount} />
                    </Text>
                    <Text>Reviews</Text>
                </View>
                <View style={{ ...styles.flexColumn, flexGrow: 1, alignItems: 'center' }}>
                    <Text>
                        <ReturnValueInThousands value={repository.ratingAverage} />
                    </Text>
                    <Text>Rating</Text>
                </View>
            </View>
        </>
    );
};

export default Statistics