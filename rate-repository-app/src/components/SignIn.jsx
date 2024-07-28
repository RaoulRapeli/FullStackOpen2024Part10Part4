import { Text, TextInput, Pressable, View, StyleSheet, Platform } from 'react-native';
import { useFormik } from 'formik';
import theme from './Text';
import * as yup from 'yup';

const styles = StyleSheet.create({
  input: {
    flexShrink: 1,
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    margin: 10,
    borderColor: "gray",
    borderRadius: 5,
    fontFamily: Platform.select({
      android: theme.fonts.android,
      ios: theme.fonts.ios,
      default: theme.fonts.default
    }),
  },
  submitButton: {
    display: 'flex',
    flexShrink: 1,
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: theme.colors.blue,
    color: theme.colors.white,
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
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: theme.colors.red, padding: 10,...styles.text }}>{formik.errors.username}</Text>
        )}
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: theme.colors.red, padding: 10,...styles.text }}>{formik.errors.password}</Text>
        )}
        <Pressable onPress={formik.handleSubmit}>
          <Text style={styles.submitButton}>Sign in</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SignIn;