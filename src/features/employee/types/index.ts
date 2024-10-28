export type Employee = {
    id: number
    firstName: string
    lastName: string
    email: string
    role: 'EMPLOYEE' | 'ADMINISTRATOR'
    departmentId: string
    position: string
    phoneNumber: string
    dateOfBirth: string
    address: string
    profileImageUrl: string
    password: string
    createdAt: string
    updatedAt: string
}