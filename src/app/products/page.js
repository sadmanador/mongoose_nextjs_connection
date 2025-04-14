import axios from "axios";
import React from "react";

const ProductsPage = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products`
  );

  const products = await res.data;
  console.log(products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
        >
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-gray-500 mb-1">{product.seller}</p>
          <p className="text-sm text-gray-600 mb-1">
            Category: {product.category}
          </p>
          <p className="text-md font-bold text-green-600 mb-2">
            ${product.price}
          </p>
          <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2">
            {"⭐".repeat(product.ratings)}{" "}
            <span className="text-gray-600">({product.ratingsCount})</span>
          </div>
          <p className="text-sm text-gray-500">In stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;
