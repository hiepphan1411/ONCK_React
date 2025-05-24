import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice";

function ProductDetail() {
  const { id } = useParams();
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const dispatch = useDispatch();
  const {product, loading, error} = useSelector((state) => state.products || {});
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id])
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await fetch(
  //         `https://67cd347add7651e464eda05a.mockapi.io/Products/${id}`
  //       );
  //       if (!response.ok) {
  //         throw new Error("Mạng không ổn định! Vui lòng kiểm tra lại.");
  //       }
  //       const data = await response.json();
  //       setProduct(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //       setError("Thất bại khi load sản phẩm");
  //       setLoading(false);
  //     }
  //   };

  //   fetchProduct();
  // }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/2 p-8">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-contain"
          />
        </div>
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
          <p className="text-green-600 text-xl font-bold mb-4">
            {product.price}
          </p>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex space-x-4">
            <button
              onClick={() => addToCart(product)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
            <Link
              to="/"
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded transition duration-300"
            >
              Back to Products
            </Link>
            <Link
              to={`/edit/${id}`}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mr-2"
            >
              Edit Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
