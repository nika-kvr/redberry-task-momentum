import { useState, useEffect } from "react";

const TaskFilter = ({ tasks }) => {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("taskFilters")) || {};
    if (savedFilters.departments)
      setSelectedDepartments(savedFilters.departments);
    if (savedFilters.employee) setSelectedEmployee(savedFilters.employee);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "taskFilters",
      JSON.stringify({
        departments: selectedDepartments,
        employee: selectedEmployee,
      })
    );
  }, [selectedDepartments, selectedEmployee]);

  useEffect(() => {
    const uniqueDepartments = [...new Set(tasks.map((t) => t.department.id))];
    setDepartments(uniqueDepartments);

    const uniqueEmployees = [...new Set(tasks.map((t) => t.employee.id))];
    setEmployees(uniqueEmployees);
  }, [tasks]);

  const handleDepartmentChange = (id) => {
    setSelectedDepartments((prev) =>
      prev.includes(id) ? prev.filter((dep) => dep !== id) : [...prev, id]
    );
  };

  const handleEmployeeChange = (id) => {
    setSelectedEmployee(id);
  };

  const applyFilters = () => {
    let filtered = tasks;
    if (selectedDepartments.length > 0) {
      filtered = filtered.filter((task) =>
        selectedDepartments.includes(task.department.id)
      );
    }
    if (selectedEmployee) {
      filtered = filtered.filter(
        (task) => task.employee.id === selectedEmployee
      );
    }
    setFilteredTasks(filtered);
  };

  const clearDepartmentFilter = () => setSelectedDepartments([]);
  const clearEmployeeFilter = () => setSelectedEmployee(null);
  const clearAllFilters = () => {
    setSelectedDepartments([]);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <div>
        <h3>Filter by Department</h3>
        {departments.map((id) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={selectedDepartments.includes(id)}
              onChange={() => handleDepartmentChange(id)}
            />
            Department {id}
          </label>
        ))}
        <button onClick={applyFilters}>Apply Department Filter</button>
        {selectedDepartments.length > 0 && (
          <button onClick={clearDepartmentFilter}>
            Remove Department Filter
          </button>
        )}
      </div>

      <div>
        <h3>Filter by Employee</h3>
        {employees.map((id) => (
          <label key={id}>
            <input
              type="radio"
              name="employee"
              checked={selectedEmployee === id}
              onChange={() => handleEmployeeChange(id)}
            />
            Employee {id}
          </label>
        ))}
        <button onClick={applyFilters}>Apply Employee Filter</button>
        {selectedEmployee && (
          <button onClick={clearEmployeeFilter}>Remove Employee Filter</button>
        )}
      </div>

      <button onClick={clearAllFilters}>Remove All Filters</button>

      <h3>Filtered Tasks</h3>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskFilter;
