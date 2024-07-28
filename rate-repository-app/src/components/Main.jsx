import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';
import useSignIn from '../hooks/useSignIn';
import AuthStorage from '../utils/authStorage';
import RepositoryList from './RepositoryList/RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import theme from './Text';
import SingleRepository from './RepositoryItem/SingleRepository';
import ReviewForm from './Review/ReviewForm';
import SignUpForm from './Register/SignUpForm';
import useSignUp from '../hooks/useSignUp';
import MyReviews from './MyReviews/MyReviews';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.colors.backgroundColor
    },
});

const Main = () => {

    const [signIn] = useSignIn();
    const [createUser] = useSignUp();
    const client = useApolloClient();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const { username, password } = values;
        const authStorage = new AuthStorage('loginToken')
        try {
            const { data } = await signIn({ username, password });
            if (data) {
                await authStorage.setAccessToken(data?.authenticate?.accessToken)
                client.resetStore();
                navigate("/repositoryList")
            }
        } catch (e) {
            console.log(e);
        }
    };

    const signUp = async (values) => {
        const { username, password } = values;
        try {
            const { data } = await createUser({ username, password });
            if(data){
                onSubmit(values)
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/repositoryList" element={<RepositoryList />} />
                <Route path="/reviewForm" element={<ReviewForm />} />
                <Route path="/repositoryList/:id" element={<SingleRepository/>} />
                <Route path="/myReviews" element={<MyReviews/>} />
                <Route path="/signup" element={<SignUpForm onSubmit={signUp}/>} />
                <Route path="/signin" element={<SignIn onSubmit={onSubmit} />} />
                <Route path="/signin" element={<SignIn onSubmit={onSubmit} />} />
                <Route path="*" element={<Navigate to="/repositoryList" replace />} />
            </Routes>
        </View>
    );
};

export default Main;