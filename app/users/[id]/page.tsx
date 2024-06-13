import React from "react";
  interface Props {
  params: {
    id: number;
  };
}
const page = ({ params }: Props) => {
  const { id } = params;
  return <div>{id}</div>;
};

export default page;
