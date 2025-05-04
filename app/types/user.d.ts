interface User extends Base {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  loginType: "EMAIL" | "GOOGLE";
  role: "APPLICANT" | "COMPANY" | "ADMIN";
  avatar: string;
}
