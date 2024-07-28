import { View, StyleSheet, Text, ScrollView, Platform, Pressable } from 'react-native';
import { Link, useNavigate } from 'react-router-native';
import theme from './Text';
import AuthStorage from '../utils/authStorage';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
const styles = StyleSheet.create({
    container: theme.container,
    barLinks: {
        marginRight: 10,
    },
    barLinkText: {
        color: theme.colors.white,
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    }
});

const AppBar = () => {

    const client = useApolloClient();
    const navigate = useNavigate()

    const { data, loading } = useQuery(GET_ME, {
        fetchPolicy: 'cache-and-network',
        variables:{includeReviews:false}
    })

    const handleSignOut = async () => {
        const authStorage = new AuthStorage('loginToken')
        try {
            await authStorage.removeAccessToken();
            client.resetStore()
            navigate("/signin")
        } catch (e) {
            console.log(e);
        }
    }

    return <View style={styles.container}>
        <ScrollView horizontal>
            <Link to="/repositoryList" style={styles.barLinks}>
                <Text style={styles.barLinkText}>Repositories</Text>
            </Link>
            {!loading && data.me === null ?
                <>
                    <Link to="/signup" style={styles.barLinks}>
                        <Text style={styles.barLinkText}>Sign up</Text>
                    </Link>
                    <Link to="/signin" style={styles.barLinks}>
                        <Text style={styles.barLinkText}>Sign in</Text>
                    </Link>
                </>
                :
                <>
                    <Link to="/reviewForm" style={styles.barLinks}>
                        <Text style={styles.barLinkText}>Create a review</Text>
                    </Link>
                    <Link to="/myReviews" style={styles.barLinks}>
                        <Text style={styles.barLinkText}>My reviews</Text>
                    </Link>
                    <Pressable onPress={() => handleSignOut()}>
                        <Text style={styles.barLinkText}>Sign out</Text>
                    </Pressable>
                </>
            }
        </ScrollView>
    </View>;
};

export default AppBar;