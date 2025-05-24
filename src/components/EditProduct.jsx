import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { useDispatch } from "react-redux";
import { updateProduct } from "../redux/productSlice";

function EditProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://67cd347add7651e464eda05a.mockapi.io/Products/${id}`
        );

        if (!response.ok) {
          throw new Error("Product not found");
        }

        const data = await response.json();
        setProduct({
          title: data.title,
          price: data.price,
          description: data.description || "",
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  //Edit thông thường
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!product.title || !product.price) {
  //       alert("Please fill in all required fields");
  //       return;
  //     }

  //     try {
  //       setSubmitting(true);

  //       const response = await fetch(
  //         `https://67cd347add7651e464eda05a.mockapi.io/Products/${id}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             ...product,
  //             price: parseFloat(product.price),
  //           }),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to update product");
  //       }
  //       showNotification("Cập nhật thành công!");
  //       navigate("/");
  //     } catch (err) {
  //       console.error("Error updating product:", err);
  //       alert("Failed to update product. Please try again.");
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };
  //Dùng redux toolkit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.title || !product.price) {
      showNotification("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    try{
        setSubmitting(true);
        await dispatch(
            updateProduct({
                id,
                product: {
                    title: product.title,
                    price: parseFloat(product.price),
                    description: product.description
                },
            })
        ).unwrap();

        showNotification("Cập nhật thành công!", "success");
        navigate("/");
    } catch(err){
        console.log("Lỗi cập nhật: ", err);
        showNotification("Cập nhật thất bại!", "error");
    } finally{
        setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading product data...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Product Name *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            step="0.01"
            min="0"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProduct;
