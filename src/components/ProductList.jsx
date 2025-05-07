import Section from "./Section";
const ProductCard = ({ product }) => (
  <div className="border rounded-2xl shadow-sm p-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-40 object-cover rounded-xl mb-2"
    />
    <h3 className="text-lg font-semibold">{product.name}</h3>
    <p className="text-sm text-gray-600">${product.price}</p>
  </div>
);

const ProductList = ({  products }) => {


  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
