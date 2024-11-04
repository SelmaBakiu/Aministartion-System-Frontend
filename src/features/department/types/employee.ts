export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role: "employee" | "administrator";
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  role?: "employee" | "administrator";
  departmentId?: string;
}

export interface TableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

export interface SearchBarProps {
  firstName: string;
  lastName: string;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onClearSearch: () => void;
  onCreateClick: () => void;
}

export interface EmployeeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  formData: EmployeeFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  mode: "create" | "edit";
}

export interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  employeeName?: string;
}
