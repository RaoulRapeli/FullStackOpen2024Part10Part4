import { FlatList, StyleSheet, View, Platform } from "react-native";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import OpenGitHub from "./OpenGitHub";
import RepositoryItem from "./RepositoryItem";
import theme from "../Text";
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    flexContainer: theme.flexContainer,
    customHeaders: {
        h1: {
            ...theme.customHeaders.h1,
            fontFamily: Platform.select({
                android: theme.fonts.android,
                ios: theme.fonts.ios,
                default: theme.fonts.default
            }),
        },

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
    },
    rating: {
        borderWidth: 2,
        borderColor: theme.colors.blue,
        color: theme.colors.blue,
        fontWeight: 'bold',
        padding: 5,
        width: 50,
        height: 50,
        borderRadius: 25,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    separator: {
        height: 10
    }
});

const RepositoryInfo = ({ repository }) => {
    return (
        <View style={{ ...styles.flexContainer, marginBottom: 10 }}>
            <RepositoryItem {...{ repository }} />
            <OpenGitHub {...{ repository }} />
        </View>
    )
};

const ItemSeparator = () => <View style={styles.separator} />

const SingleRepository = () => {
    const param = useParams()

    const { repository, fetchMore, loading } = useRepository({
        first: 8,
        id: param.id
    });

    if (loading) {
        return false
    }

    const onEndReach = () => {
        fetchMore();
    };
    const reviews = repository.reviews.edges

    return (
        <View>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item.node} myReviews={false} />}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={({ node }) => node.id}
                ListHeaderComponent={() => <RepositoryInfo {...{ repository }} />}
                onEndReached={onEndReach}
                onEndReachedThreshold={0.5}
                style={{ marginBottom: 100 }}
            />
        </View>
    );
};

export default SingleRepository;