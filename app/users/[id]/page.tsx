import React from "react";
import { notFound } from "next/navigation";
interface Props {
  params: {
    id: number;
  };
}
const page = ({ params }: Props) => {
  const { id } = params;

  if (id >= 10) {
    return notFound() ;
  }
  return <div>{id}</div>;
};

export default page;
