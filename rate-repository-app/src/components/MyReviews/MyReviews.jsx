import { View, FlatList, StyleSheet } from "react-native"
import theme from "../Text"
import { useQuery } from "@apollo/client"
import { GET_ME } from "../../graphql/queries"
import ReviewItem from "../RepositoryItem/ReviewItem"

const styles = StyleSheet.create({
    separator: {
        height: 10
    }
});

const ItemSeparator = () => <View style={styles.separator} />

const MyReviews = () => {

    const { data, loading } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
        variables: { includeReviews: true }
    })

    if(loading){
        return null
    }

    const reviews = data.me.reviews.edges ? data.me.reviews.edges.map(edge => edge.node)
    : []

    return (
        <View>
            <FlatList
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} myReviews={true}/>}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={({ id }) => id}
                style={{ marginBottom: 100 }}
            />
        </View>
    )
}

export default MyReviews