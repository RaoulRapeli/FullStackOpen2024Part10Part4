import { Text, TextInput, Pressable, View, StyleSheet, Platform } from 'react-native';
import { useFormik } from 'formik';
import theme from '../Text';
import * as yup from 'yup';

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
    username: yup
        .string()
        .min(5,'Username length is between 5 and 30')
        .max(30,'Username length is between 5 and 30')
        .required('Username is required'),
    password: yup
        .string()
        .min(5,'Password length is between 5 and 50')
        .max(50,'Password length is between 5 and 50')
        .oneOf([yup.ref('passwordConfirmation'), null], 'Password must match to Password confirmation')
        .required('Password is required'),
    passwordConfirmation: yup
        .string()
        .min(5,'Password confirmation length is between 5 and 50')
        .max(50,'Password confirmation length is between 5 and 50')
        .oneOf([yup.ref('password'), null], 'Password confirmation must match to Password')
        .required('Password confimration is required')
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};



const SignUpForm = ({onSubmit}) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <View style={{ ...styles.flexContainer }}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formik.values.username}
                onChangeText={formik.handleChange('username')}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={{ color: theme.colors.red, padding: 10, ...styles.text }}>{formik.errors.username}</Text>
            )}
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange('password')}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={{ color: theme.colors.red, padding: 10, ...styles.text }}>{formik.errors.password}</Text>
            )}
            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="Password confrimation"
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={{ color: theme.colors.red, padding: 10, ...styles.text }}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable onPress={formik.handleSubmit}>
                <Text style={styles.submitButton}>Sign up</Text>
            </Pressable>
        </View>
    )
}

export default SignUpForm