import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useState } from "react";
import { useNotification } from "../context/NotificationContext";
import { useCart } from "../context/CartContext";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productSlice";

function ProductList() {
  const {
    data: products,
    loading,
    error,
    refetch,
  } = useFetch("https://67cd347add7651e464eda05a.mockapi.io/Products");
  const [deletingId, setDeletingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { showNotification } = useNotification();
  const { addToCart } = useCart();

  const dispatch = useDispatch();
  
  // Filter products based on search query
  const filteredProducts = products ? products.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) : [];

  //Xử lý xóa bình thường
  // const handleDelete = async (id) => {
  //   try {
  //     setDeletingId(id);
  //     const response = await fetch(
  //       `https://67cd347add7651e464eda05a.mockapi.io/Products/${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Lỗi khi xóa sản phẩm");
  //     }

  //     showNotification(`Đã xóa sản phẩm với id: "${id}"!`, "success");
  //     refetch();
  //   } catch (err) {
  //     showNotification(err.message || "Lỗi khi xóa sản phẩm", "error");
  //   } finally {
  //     setDeletingId(null);
  //   }
  // };

  const handleDelete = async (id) => {
    try{
      setDeletingId(id);
      await dispatch(deleteProduct(id)).unwrap();
      showNotification(`Đã xóa sản phẩm với id: ${id}`, "success");
      refetch();
    }catch(err){
      showNotification(err?.message || "Lỗi khi xóa sản phẩm", "error");
    }finally{
      setDeletingId(null);
    }
  }

  if (loading) {
    return <div className="flex flex-col justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p>Đang tải...</p>
    </div>;
  } 

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          to="/add"
          className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-center"
        >
          Thêm sản phẩm mới
        </Link>
      </div>
      
      {/* Search bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Tìm kiếm sản phẩm..."
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ?
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-lg bg-white relative"
            >
              <div className="h-48 sm:h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-4"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {product.title}
                </h2>
                <p className="text-green-600 font-bold mb-2">
                  ${product.price}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded mb-3"
                >
                  Thêm vào giỏ hàng
                </button>
                <hr className="mb-3 text-gray-500"/>
                <div className="flex flex-wrap gap-2 mt-auto">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded transition duration-300"
                  >
                    Xem chi tiết
                  </Link>
                  <Link
                    to={`/edit/${product.id}`}
                    className="flex-1 text-center bg-yellow-500 text-white py-2 px-3 rounded hover:bg-yellow-600"
                  >
                    Chỉnh sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deletingId === product.id}
                    className={`flex-1 text-center py-2 px-3 rounded text-white ${
                      deletingId === product.id
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {deletingId === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              {searchQuery ? `Không tìm thấy sản phẩm nào với từ khóa "${searchQuery}"` : "Không có sản phẩm nào..."}
            </div>
          )
        }
      </div>
    </div>
  );
}

export default ProductList;
