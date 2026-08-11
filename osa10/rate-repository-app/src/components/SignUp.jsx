import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10,
    gap: 10,
  },
  inputField: {
    color: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    textAlign: 'center',
    borderRadius: 6,
    padding: 10,
  },
  errorBorder: {
    borderColor: theme.colors.errorColor,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username required length 5-30 characters')
    .max(30, 'Username required length 5-30 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password required length 5-30 characters')
    .max(30, 'Password required length 5-30 characters'),
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], `password doesn't match`),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },
    onSubmit,
    validationSchema,
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.inputField,
          formik.touched.username &&
            formik.errors.username &&
            styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
        placeholder="Username"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.errorColor }}>
          {formik.errors.username}
        </Text>
      )}
      <TextInput
        style={[
          styles.inputField,
          formik.touched.password &&
            formik.errors.password &&
            styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        onBlur={formik.handleBlur('password')}
        placeholder="Password"
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.errorColor }}>
          {formik.errors.password}
        </Text>
      )}
      <TextInput
        style={[
          styles.inputField,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('passwordConfirmation')}
        value={formik.values.passwordConfirmation}
        onBlur={formik.handleBlur('passwordConfirmation')}
        placeholder="Password confirmation"
        secureTextEntry
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    console.log(username, password);
    try {
      await signUp({ username, password });
      try {
        const data = await signIn({ username, password });
        console.log(data);
        navigate('/');
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignUp;
