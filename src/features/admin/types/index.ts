
export type InsertEmployee = {
    firstName: string;
    lastName: string;
    email: string;
    role: "employee" | "administrator";
    departmentId: string;
    position: string;
    phoneNumber: string;
    dateOfBirth: string;
    address: string;
    password: string;
    };
