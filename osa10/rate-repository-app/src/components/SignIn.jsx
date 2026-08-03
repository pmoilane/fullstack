import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';

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

const onSubmit = (values) => {
  console.log(values);
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
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
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
