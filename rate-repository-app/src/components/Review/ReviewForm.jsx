import { Text, TextInput, Pressable, View, StyleSheet, Platform } from 'react-native';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import theme from '../Text';
import * as yup from 'yup';
import useReview from '../../hooks/useReview';

const styles = StyleSheet.create({
    flexContainer: theme.flexContainer,
    input: {
        ...theme.input,
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    },
    submitButton: {
        ...theme.submitButton,
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    },
    text: {
        fontFamily: Platform.select({
            android: theme.fonts.android,
            ios: theme.fonts.ios,
            default: theme.fonts.default
        }),
    }
})

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repositoryn name is required'),
    rating: yup
        .number()
        .integer()
        .moreThan(0, 'Raiting between 0 and 100')
        .lessThan(101, 'Raiting between 0 and 100')
        .required('Raiting is required')
});

const initialValues = {
    ownerName: '',
    repositoryName: '',
    rating: '0',
    review: '',
};

const ReviewForm = () => {

    const [createReview] = useReview();
    const client = useApolloClient();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            values.rating = Number(values.rating)
            const { data } = await createReview({ ...values });
            if (data) {
                client.resetStore();
                navigate(`/repositoryList/${data.createReview.repositoryId}`)
            }
        } catch (e) {
            console.log(e);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={{ ...styles.flexContainer }}>
            <TextInput
                style={styles.input}
                placeholder="Repository owner name"
                value={formik.values.ownerName}
                onChangeText={formik.handleChange('ownerName')}
            />
            {formik.touched.ownerName && formik.errors.ownerName && (
                <Text style={{ color: theme.colors.red, padding: 10, ...styles.text }}>{formik.errors.ownerName}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Repository name"
                value={formik.values.repositoryName}
                onChangeText={formik.handleChange('repositoryName')}
            />
            {formik.touched.repositoryName && formik.errors.repositoryName && (
                <Text style={{ color: theme.colors.red, padding: 10, ...styles.text }}>{formik.errors.repositoryName}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Raiting between 0 and 100"
                value={formik.values.rating}
                onChangeText={formik.handleChange('rating')}
                keyboardType='numeric'
            />
            {formik.touched.rating && formik.errors.rating && (
                <Text style={{ color: theme.colors.red, padding: 10, ...styles.text }}>{formik.errors.rating}</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Review"
                value={formik.values.review}
                multiline={true}
                onChangeText={formik.handleChange('review')}
            />
            <Pressable onPress={formik.handleSubmit}>
                <Text style={styles.submitButton}>Create a review</Text>
            </Pressable>
        </View>
    )
}

export default ReviewForm