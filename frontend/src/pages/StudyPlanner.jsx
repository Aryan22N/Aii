import React, { useState, useEffect } from "react";
import axios from "axios";

const today = new Date().toISOString().split("T")[0];

const StudyPlanner = () => {
  const [date, setDate] = useState(today);
  const [title, setTitle] = useState("");
  const [todos, setTodos] = useState([]);

  // ✅ Load todos when component mounts or date changes
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const res = await axios.get(`/api/study-todos?date=${date}`);
        setTodos(res.data);
      } catch (err) {
        console.error("Failed to load todos", err);
      }
    };

    loadTodos();
  }, [date]);

  const addTodo = async () => {
    if (!title) return;

    await axios.post("/api/study-todos", {
      title,
      date,
    });

    setTitle("");
    setDate((d) => d); // trigger reload
  };

  const toggleTodo = async (id) => {
    await axios.patch(`/api/study-todos/${id}`);
    setDate((d) => d);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/study-todos/${id}`);
    setDate((d) => d);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Study Planner</h2>

      <input
        type="date"
        className="border p-2 w-full mb-3"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add study task..."
          className="border p-2 flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTodo}
          className="bg-purple-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {todos.length === 0 && (
        <p className="text-gray-500 text-center">No tasks for this day</p>
      )}

      {todos.map((todo) => (
        <div
          key={todo._id}
          className="flex justify-between items-center border p-2 mb-2 rounded"
        >
          <span
            onClick={() => toggleTodo(todo._id)}
            className={`cursor-pointer ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </span>

          <button
            onClick={() => deleteTodo(todo._id)}
            className="text-red-500 font-bold"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudyPlanner;
