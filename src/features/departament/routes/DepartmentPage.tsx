
import { useGetDepartment } from "../api/getDepartments";
import { OrganizationChart } from 'primereact/organizationchart';
        

const DepartmentPage: React.FC = () => {
    const data = useGetDepartment();
console.log(data);
    function nodeTemplate(node: OrganizationChartNodeData): ReactNode {
        throw new Error("Function not implemented.");
    }

    return (
        <OrganizationChart 
            value={data.data}
            nodeTemplate={nodeTemplate}
         />

    );
};

export default DepartmentPage;
