import {useState} from 'react';
import ProductCard from './ProductCard';
import {useFetcher} from 'react-router-dom';

export default function ProductGrid({collection, url}) {
  const [nextPage, setNextPage] = useState(
    collection.products.pageInfo.hasNextPage,
  );

  const [endCursor, setEndCursor] = useState(
    collection.products.pageInfo.endCursor,
  );

  const [products, setProducts] = useState(collection.products.nodes || []);
  const fetcher = useFetcher();

  return (
    <section className="w-full gap-4 md:gap-8 grid">
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {collection.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {product.pageInfo.hasNextPage && (
        <div className="flex items-center justify-center mt-6">
          <button className="inline-block rounded font-medium text-center py-3 px-6 border w-full cursor-pointer">
            Load More Products
          </button>
        </div>
      )}
    </section>
  );
}
