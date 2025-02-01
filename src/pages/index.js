// pages/index.js
import { useState, useEffect } from 'react';
import { getEmployees } from '../services/employeeService';

const Index = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <p>Loading employees...</p>;
  }

  return (
    <div>
      <h1>Employees List</h1>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.firstName} {employee.lastName} - {employee.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Index;
