import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";

export default function TaskBoard() {
  const defaultTasks = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "Connect an existing API to a third-party database using secure methods",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTasks]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const handleAddEditTask = (newTask, isAdd) => {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }
    setShowAddModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setShowAddModal(true);
  };

  const handleCloseClick = () => {
    setShowAddModal(false);
    setTaskToUpdate(null);
  };

  const handleDeleteTask = (taskId) => {
    const tasksAfterDelete = tasks.filter((task) => task.id !== taskId);
    setTasks(tasksAfterDelete);
  };

  const handleDeleteAllClick = () => {
    tasks.length = 0;
    setTasks([...tasks]);
  };

  const handleFavorite = (taskId) => {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTasks = [...tasks];
    newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
    setTasks(newTasks);
  };

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <SearchTask />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddTask={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          <TaskList
            tasks={tasks}
            onFav={handleFavorite}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        </div>
      </div>
    </section>
  );
}
