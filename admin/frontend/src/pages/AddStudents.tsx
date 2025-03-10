import { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const AddStudents = () => {
  const navigate = useNavigate();
  interface Student {
    name: string;
    rollNo: string;
    email: string;
    password: string;
  }

  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No file chosen");

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  // Parse CSV file
  const handleParse = () => {
    if (!file) {
      setError("Please upload a CSV file.");
      return;
    }
    setError("");

    Papa.parse(file, {
      complete: (result) => {
        const parsedData = result.data as string[][];

        // Ensure the first row is headers and remove it
        if (parsedData.length > 1) {
          const formattedData = parsedData.slice(1).map((row) => ({
            name: row[0],
            rollNo: row[1],
            email: row[2],
            password: row[3],
          }));

          setStudents(formattedData);
        } else {
          setError("CSV file is empty or incorrectly formatted.");
        }
      },
      skipEmptyLines: true,
    });
  };

  // Submit CSV data to backend
  const handleSubmit = async () => {
    if (!file) {
      setError("No file selected.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      const response = await axios.post("http://localhost:8000/students/upload-students", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }, withCredentials:true
      });
  
      if (response.data.success) {
        alert("Students uploaded successfully!");
        setStudents([]);
        setFile(null);
        setFileName("No file chosen");
      }
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload students.");
    }
    alert("Students uploaded successfully!");
    navigate("/admDash");
  };
  

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold text-center mb-4">Add Students (CSV)</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Styled File Input */}
          <div className="mb-4">
            <label className="flex items-center justify-between w-full bg-gray-200 text-gray-700 rounded px-3 py-2 cursor-pointer hover:bg-gray-300">
              <span>{fileName}</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <span className="bg-blue-500 text-white px-3 py-1 rounded ml-2">Choose File</span>
            </label>
          </div>

          <button
            onClick={handleParse}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
          >
            Preview CSV
          </button>

          {/* Show preview */}
          {students.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Preview</h3>
              <ul className="text-sm bg-gray-200 p-2 rounded">
                {students.slice(0, 5).map((student, index) => (
                  <li key={index}>
                    {student.name} - {student.rollNo} - {student.email} - {student.password}
                  </li>
                ))}
                {students.length > 5 && <p>+ {students.length - 5} more</p>}
              </ul>
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            disabled={students.length === 0}
          >
            Submit Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudents;
