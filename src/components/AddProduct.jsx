import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../context/NotificationContext";
import { addNewProduct } from "../redux/productSlice";
import { useDispatch } from "react-redux";

function AddProduct() {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  //Hàm submit bình thường
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!product.name || !product.price) {
//       showNotification("Vui lòng nhập đầy đủ thông tin!", "error");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch(
//         "https://67cd347add7651e464eda05a.mockapi.io/Products",
//         {
//           method: "POST",
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
//         throw new Error("Failed to add product");
//       }

//       // Chuyển về trang chủ sau khi thêm
//       navigate("/");
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert("Không thể thêm sản phẩm, Vui lòng thử lại sau");
//     } finally {
//       setLoading(false);
//     }
//   };
    //Áp dụng redux toolkit
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!product.title || !product.price){
            showNotification("Vui lòng nhập đầy đủ thông tin!", "error");
            return;
        }
        try{
            setLoading(true);

            await dispatch(
                addNewProduct({
                    ...product,
                    price: parseFloat(product.price),
                })
            ).unwrap();
            showNotification("Thêm sản phẩm thành công!", "success");
            navigate("/");
        }catch(err){
            showNotification(err?.message || "Lỗi khi thêm", "error");
            console.log(err);
        }
    }
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Thêm sản phẩm mới</h2>

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
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
