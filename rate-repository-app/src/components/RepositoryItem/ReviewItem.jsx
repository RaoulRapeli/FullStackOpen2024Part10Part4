import { Text, View, StyleSheet, Platform, Pressable, Alert } from "react-native";
import theme from "../Text";
import { format } from "date-fns";
import { useNavigate } from "react-router-native";
import useMyReview from "../../hooks/useMyReview";
import { useApolloClient } from "@apollo/client";

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
    blueButton: {
        backgroundColor: theme.colors.blue,
        ...theme.buttonLayout,
        fontSize: 14,
        fontWeight: 'bold',
    },
    redButton: {
        backgroundColor: theme.colors.red,
        ...theme.buttonLayout,
        fontSize: 14,
        fontWeight: 'bold',
    }
});

const ReviewItem = ({ review, myReviews }) => {

    const navigate = useNavigate()
    const client = useApolloClient();
    const [deleteReview] = useMyReview()
    const createTwoButtonAlert = () =>
        Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
            {
                text: 'CANCEL',
                onPress: () => {},
                style: 'cancel',
            },
            { text: 'DELETE', onPress: () => {deleteReview({id:review.id});client.resetStore();} },
        ]);
    
    return (
        <View style={styles.flexContainer}>
            <View style={styles.flexRow}>
                <View>
                    <Text style={styles.rating}>{review.rating}</Text>
                </View>
                <View style={{ ...styles.flexColumn, flexShrink: 1 }}>
                    <Text style={styles.customHeaders.h1}>{myReviews ? review.repositoryId : review.user.username}</Text>
                    <Text>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
            {myReviews ?
                <View style={styles.flexRow}>
                    <Pressable style={styles.blueButton} onPress={() => navigate(`/repositoryList/${review.repositoryId}`)}>
                        <Text style={styles.blueButton}>
                            View repository
                        </Text>
                    </Pressable>
                    <Pressable style={styles.redButton} onPress={createTwoButtonAlert}>
                        <Text style={styles.redButton}>
                            Delete review
                        </Text>
                    </Pressable>
                </View>
                :
                null
            }
        </View>
    )
};

export default ReviewItem