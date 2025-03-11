import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import Products from "./pages/Products";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <Router>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/Form" element={<Form />} />
            <Route path="/Products" element={<Products />} />
            <Route path="*" element={<h1> PAGE NOT FOUND</h1>} />
          </Routes>
        </QueryClientProvider>
      </Router>
    </div>
  );
}

export default App;
