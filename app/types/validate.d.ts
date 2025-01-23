interface IValidationPassword {
  has12Chars: boolean | null;
  hasSymbol: boolean | null;
  hasNumber: boolean | null;
  hasUppercase: boolean | null;
  hasLowercase: boolean | null;
}
