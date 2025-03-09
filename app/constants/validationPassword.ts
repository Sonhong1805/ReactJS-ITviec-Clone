const validationPassword = (passwordValue: string): IValidationPassword => ({
  has12Chars: passwordValue.length >= 12,
  hasSymbol: /[!@#$%^&*()_+~`|}{[\]\\:;?><,./-=]/.test(passwordValue),
  hasNumber: /[0-9]/.test(passwordValue),
  hasUppercase: /[A-Z]/.test(passwordValue),
  hasLowercase: /[a-z]/.test(passwordValue),
});

export default validationPassword;
