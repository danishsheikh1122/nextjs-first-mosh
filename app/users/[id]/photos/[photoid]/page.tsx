import React from "react";
interface Props {
  params: { id: number; photoid: number };
}
const page = ({ params: { id, photoid } }: Props) => {
  return (
    <div>
      photo page
      {id}
      photo id
      {photoid}
    </div>
  );
};

export default page;
