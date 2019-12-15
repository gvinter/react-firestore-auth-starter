import SignInForm from './SignInForm';
import SignInGoogle from './SignInGoogle';
import SignInFacebook from './SignInFacebook';
import SignInTwitter from './SignInTwitter';

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

export default SignInForm;

export {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
  ERROR_CODE_ACCOUNT_EXISTS,
  ERROR_MSG_ACCOUNT_EXISTS,
};
