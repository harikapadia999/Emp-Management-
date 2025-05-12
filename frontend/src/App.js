"use client";

import { useState, useEffect } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(API_URL);
      // console.log(response.data);
      setEmployees(response.data);
      setFilteredEmployees(response.data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      // console.log(filtered);
      setFilteredEmployees(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, employees]);

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  const handleFormSubmit = () => {
    fetchEmployees();
    setEditingEmployee(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Employee Management System
      </h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingEmployee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <EmployeeForm
          onSubmitSuccess={handleFormSubmit}
          employee={editingEmployee}
          apiUrl={API_URL}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Employee List</h2>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {isLoading ? (
          <div className="text-center py-4">Loading employees...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : filteredEmployees.length === 0 ? (
          <div className="text-center py-4">No employees found</div>
        ) : (
          <>
            <EmployeeList
              employees={currentEmployees}
              onDelete={handleDeleteEmployee}
              onEdit={handleEditEmployee}
            />
            <Pagination
              employeesPerPage={employeesPerPage}
              totalEmployees={filteredEmployees.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
