export interface Department {
  id: string;
  name: string;
  description: string;
  parentDepartmentId: string | null;
  isDeleted: boolean;
}

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  dateOfBirth: string;
}
export interface UpdateDepartment {
  name: string;
  description: string;
  parentDepartmentId: string | null;
}

export interface DepartmentTree {
  id: string;
  name: string;
  children: DepartmentTree[];
}

export interface OrgChartNode {
  key: string;
  data: Department;
  label: string;
  type: "department";
  style: {
    padding: string;
    borderRadius: string;
    backgroundColor: string;
    boxShadow: string;
    border: string;
  };
  expanded: boolean;
  children?: OrgChartNode[];
}
