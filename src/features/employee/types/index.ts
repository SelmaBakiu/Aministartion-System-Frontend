export type Employee = {
  id: string | "";
  firstName: string;
  lastName: string;
  email: string;
  role: "employee" | "administrator";
  department: {
    description: string;
    name: string;
    id: string;
  };
  position: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  profileImageUrl: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateEmployee = {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  position: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
};

export type InsertEmployee = {
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  position: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  password: string;
};

export type ResetPasswordRequest = {
  oldPassword: string;
  newPassword: string;
};