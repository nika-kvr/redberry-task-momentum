import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/tasks/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./pages/Header";
import TaskForm from "./pages/tasks/TaskForm";
import "@fontsource/firago";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/taskForm" element={<TaskForm />} />
            <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
