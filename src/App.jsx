import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Products from "./pages/tasks/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./pages/Header";
import TaskForm from "./pages/tasks/TaskForm";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/form" element={<Form />} />
            <Route path="/products" element={<Products />} />
            <Route path="/taskForm" element={<TaskForm />} />
            <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
