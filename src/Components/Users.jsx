import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const Users = () => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("students", JSON.stringify(students));
    } catch (error) {
      console.log(error);
    }
  }, [students]);

  const addOrUpdateStudent = () => {
    if (!name.trim() || !course.trim()) {
      alert("Please fill all details");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (editId !== null) {
        const updated = students.map((student) =>
          student.id === editId ? { ...student, name, course } : student
        );
        setStudents(updated);
        setEditId(null);
      } else {
        const newStudent = {
          id: Date.now(),
          name,
          course,
        };
        setStudents([...students, newStudent]);
      }

      setName("");
      setCourse("");
      setLoading(false);
    }, 500);
  };

  const editStudent = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEditId(student.id);
  };

  const deleteStudent = (id) => {
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
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Student Manager
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-md"
          />

          <input
            type="text"
            placeholder="Course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-md"
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
          <div className="text-center py-10">
            <p className="text-lg font-semibold text-gray-600">Loading...</p>
          </div>
        ) : students.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No students found
          </div>
        ) : (
          <ul className="space-y-4">
            {students.map((student) => (
              <li
                key={student.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
              >
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-sm text-gray-500">{student.course}</p>
                </div>

                <div className="flex gap-3">
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Users;