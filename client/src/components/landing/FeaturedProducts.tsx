import { useEffect, useState } from "react";
import { getAllProducts } from "../../utils/handlers";
import { IProduct } from "../../utils/types";
import ProductCard from "../ProductCard";

function FeaturedProducts() {
  const [displayProducts, setDisplayProducts] = useState<IProduct[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function handleGetProducts() {
      try {
        setIsLoading(true);
        const product = await getAllProducts();
        console.log(product);
        setDisplayProducts(product as IProduct[]);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    handleGetProducts();
  }, []);
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>
        {displayProducts.length <= 0 ? (
          <div className="flex items-center justify-center p-4 text-zinc-500 text-2xl ">
            <p>Not Products Available Yet!!</p>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    _id={product._id}
                    title={product.title}
                    description={product.description}
                    images={product.images}
                    category={product.category}
                    stock={product.stock}
                    price={product.price}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
