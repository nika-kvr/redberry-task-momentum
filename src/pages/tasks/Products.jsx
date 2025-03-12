import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "./EmployeeForm";

const fetchProducts = async () => {
  const { data } = await axios.get("https://dummyjson.com/products");
  return data.products;
};

const ProductsList = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const navigate = useNavigate();

  const [minPrice, setMinPrice] = useState(
    localStorage.getItem("minPrice") || ""
  );
  const [maxPrice, setMaxPrice] = useState(
    localStorage.getItem("maxPrice") || ""
  );
  const [category, setCategory] = useState(
    localStorage.getItem("category") || ""
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [filterValues, setFilterValues] = useState({
    minPrice,
    maxPrice,
    category,
  });

  useEffect(() => {
    localStorage.setItem("minPrice", minPrice);
    localStorage.setItem("maxPrice", maxPrice);
    localStorage.setItem("category", category);
  }, [minPrice, maxPrice, category]);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const applyFilters = () => {
    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
      setErrorMessage("Min price cannot be greater than Max price");
      return;
    }

    setErrorMessage("");
    setFilterValues({
      minPrice,
      maxPrice,
      category,
    });
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setCategory("");
    setFilterValues({
      minPrice: "",
      maxPrice: "",
      category: "",
    });
    setErrorMessage("");
  };

  const filteredProducts = products?.filter((product) => {
    const isWithinPriceRange =
      (filterValues.minPrice ? product.price >= filterValues.minPrice : true) &&
      (filterValues.maxPrice ? product.price <= filterValues.maxPrice : true);

    const isInCategory = filterValues.category
      ? product.category.toLowerCase() === filterValues.category.toLowerCase()
      : true;

    return isWithinPriceRange && isInCategory;
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div>
      <button onClick={toggleModal}>Show Modal</button>
      <EmployeeForm show={showModal} onClose={toggleModal} />
      <button onClick={() => navigate("/form")}>Form</button>
      <div className="p-4 space-x-4">
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          <option value="beauty">Beauty</option>
          <option value="fragrances">Fragrances</option>
          <option value="furniture">Furniture</option>
        </select>
        <button
          onClick={applyFilters}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Filter
        </button>
        <button
          onClick={clearFilters}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Clear Filters
        </button>
      </div>

      {/* Error Message (Only appears after clicking the button) */}
      {errorMessage && <p className="text-red-500 p-2">{errorMessage}</p>}

      {/* Products Grid */}
      <div className="grid grid-cols-3 gap-4 p-4">
        {filteredProducts?.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{product.title}</h2>
            <p className="text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
