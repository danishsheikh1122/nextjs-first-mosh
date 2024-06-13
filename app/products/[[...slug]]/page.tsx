import React from "react";
interface Props {
  params: {
    slug: string[];
  };
  searchParams: { sortOrder: string };
} 
const ProductPage = ({
  params: { slug },
  searchParams: { sortOrder },
}: Props) => {
  return (
    <div>
      Product page {slug} and search params are {sortOrder}
    </div>
  );
};

export default ProductPage;
