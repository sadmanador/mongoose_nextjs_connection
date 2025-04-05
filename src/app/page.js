"use client";

import { useEffect, useState } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks");
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        } else {
          throw new Error("Failed to fetch tasks");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      {error && <p>Error: {error}</p>}
      <pre>{JSON.stringify(tasks, null, 2)}</pre>{" "}
    </div>
  );
}
