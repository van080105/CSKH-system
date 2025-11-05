"use client"

import { useState } from "react"
import { Star, X, Plus } from "lucide-react"

export function TodoListPage() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Meeting with CEO", completed: false, starred: false },
    { id: 2, title: "Pick up kids from school", completed: false, starred: false },
    { id: 3, title: "Shopping with Brother", completed: false, starred: false },
    { id: 4, title: "Review with HR", completed: true, starred: false },
    { id: 5, title: "Going to Dia's School", completed: false, starred: false },
    { id: 6, title: "Check design files", completed: false, starred: true },
    { id: 7, title: "Update File", completed: false, starred: false },
  ])

  const toggleStar = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, starred: !task.starred } : task)))
  }

  const toggleComplete = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">To-Do List</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          <Plus className="h-4 w-4" />
          Add New Task
        </button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center gap-4 p-4 rounded-lg border transition-colors ${
              task.completed ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className={`flex-1 text-lg ${task.completed ? "text-gray-500 line-through" : "text-gray-900"}`}>
              {task.title}
            </span>
            <button
              onClick={() => toggleStar(task.id)}
              className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                task.starred ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <Star className="h-5 w-5" fill={task.starred ? "currentColor" : "none"} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-2 rounded hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
