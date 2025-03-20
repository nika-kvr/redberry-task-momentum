import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TasksList from "./pages/tasks/TasksList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@fontsource/firago";
import Header from "./pages/Header";
import TaskForm from "./pages/tasks/TaskForm";
import TaskDetail from "./pages/tasks/TaskDetail";

const queryClient = new QueryClient();

function App() {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <div className="App">
      <Router>
        <Header showModal={showModal} toggleModal={toggleModal} />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<TasksList />} />
            <Route
              path="/taskForm"
              element={<TaskForm toggleModal={toggleModal} />}
            />
            <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
