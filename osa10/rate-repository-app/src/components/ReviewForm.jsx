import { useFormik } from 'formik';
import Text from './Text';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import useReviewForm from '../hooks/useReviewForm';
import { useNavigate } from 'react-router-native';

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
  repositoryOwnerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating scale is 0-100')
    .max(100, 'Rating scale is 0-100')
    .required('Rating is required'),
  review: yup.string().optional(),
});

export const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      repositoryOwnerName: '',
      repositoryName: '',
      rating: '',
      review: '',
    },
    onSubmit,
    validationSchema,
  });
  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.inputField,
          formik.touched.repositoryOwnerName &&
            formik.errors.repositoryOwnerName &&
            styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('repositoryOwnerName')}
        value={formik.values.repositoryOwnerName}
        onBlur={formik.handleBlur('repositoryOwnerName')}
        placeholder="Repository owner name"
      />
      {formik.touched.repositoryOwnerName &&
        formik.errors.repositoryOwnerName && (
          <Text style={{ color: theme.colors.errorColor }}>
            {formik.errors.repositoryOwnerName}
          </Text>
        )}
      <TextInput
        style={[
          styles.inputField,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('repositoryName')}
        value={formik.values.repositoryName}
        onBlur={formik.handleBlur('repositoryName')}
        placeholder="Repository name"
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: theme.colors.errorColor }}>
          {formik.errors.repositoryName}
        </Text>
      )}
      <TextInput
        style={[
          styles.inputField,
          formik.touched.rating && formik.errors.rating && styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('rating')}
        value={formik.values.rating}
        onBlur={formik.handleBlur('rating')}
        placeholder="Rating between 0 and 100"
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: theme.colors.errorColor }}>
          {formik.errors.rating}
        </Text>
      )}
      <TextInput
        style={[
          styles.inputField,
          formik.touched.review && formik.errors.review && styles.errorBorder,
        ]}
        onChangeText={formik.handleChange('review')}
        value={formik.values.review}
        onBlur={formik.handleBlur('review')}
        placeholder="Review"
        multiline
      />
      {formik.touched.review && formik.errors.review && (
        <Text style={{ color: theme.colors.errorColor }}>
          {formik.errors.review}
        </Text>
      )}
      <Pressable onPress={formik.handleSubmit}>
        <Text style={styles.button}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const [createReview] = useReviewForm();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { repositoryOwnerName, repositoryName, rating, review } = values;
    console.log(repositoryOwnerName);

    try {
      const data = await createReview({
        ownerName: repositoryOwnerName,
        repositoryName,
        rating: Number(rating),
        text: review,
      });
      console.log(data);
      navigate(`/${data.createReview.repository.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
