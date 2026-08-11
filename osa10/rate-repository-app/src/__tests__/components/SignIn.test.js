import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();
      // render the SignInContainer component, fill the text inputs and press the submit button
      await render(<SignInContainer onSubmit={onSubmit} />);

      await fireEvent.changeText(
        screen.getByPlaceholderText('Username'),
        'kalle',
      );
      await fireEvent.changeText(
        screen.getByPlaceholderText('Password'),
        'password',
      );
      await fireEvent.press(screen.getByText('Sign in'));

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
