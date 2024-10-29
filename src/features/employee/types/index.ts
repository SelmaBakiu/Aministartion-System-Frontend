export type Employee = {
  id: string | '';
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
  id: number ;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: string;
  position: string;
  phoneNumber: string;
  dateOfBirth: string;
  address: string;
  profileImageUrl: string;
};
