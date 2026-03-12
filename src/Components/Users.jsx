import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const Users = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addOrUpdateStudent = () => {
    if (!name.trim() || !email.trim() || !age.trim()) {
      alert("Please fill all details");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (Number(age) <= 0) {
      alert("Please enter a valid age");
      return;
    }
    

    setLoading(true);

    setTimeout(() => {
      if (editId !== null) {
        const updated = students.map((student) =>
          student.id === editId ? { ...student, name, email, age } : student
        );
        setStudents(updated);
        setEditId(null);
      } else {
        const newStudent = {
          id: Date.now(),
          name,
          email,
          age,
        };
        setStudents([...students, newStudent]);
      }

      setName("");
      setEmail("");
      setAge("");
      setLoading(false);
    }, 500);
  };

  const editStudent = (student) => {
    setName(student.name);
    setEmail(student.email);
    setAge(student.age);
    setEditId(student.id);
  };

  const deleteStudent = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    setLoading(true);

    setTimeout(() => {
      const filtered = students.filter((student) => student.id !== id);
      setStudents(filtered);
      setLoading(false);
    }, 500);
  };

  const downloadExcel = () => {
    if (students.length === 0) {
      alert("No student data available");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "students.xlsx");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Student Manager
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />

          <input
            type="email"
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />

          <input
            type="number"
            placeholder="Student Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border px-4 py-2 rounded-md"
          />

          <button
            onClick={addOrUpdateStudent}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            {editId !== null ? "Update" : "Add"}
          </button>

          <button
            onClick={downloadExcel}
            className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
          >
            Download Excel
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-lg font-semibold text-gray-600">
            Loading...
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No students found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border border-gray-200 px-4 py-3">Name</th>
                  <th className="border border-gray-200 px-4 py-3">Email</th>
                  <th className="border border-gray-200 px-4 py-3">Age</th>
                  <th className="border border-gray-200 px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-3">{student.name}</td>
                    <td className="border border-gray-200 px-4 py-3">{student.email}</td>
                    <td className="border border-gray-200 px-4 py-3">{student.age}</td>
                    <td className="border border-gray-200 px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => editStudent(student)}
                          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteStudent(student.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;