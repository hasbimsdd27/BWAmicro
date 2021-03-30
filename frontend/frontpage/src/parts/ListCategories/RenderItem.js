import React from "react";

import Link from "next/link";

import formatThoushand from "src/helpers/formatThoushand";

export default function RenderItem({ item, key }) {
  return (
    <div className="w-1/6 px-4 h-100" key={key}>
      <div className="card relative trasition-all duration-300">
        {item.imageName}
        <div className="card-meta mt-10">
          <h4 className="text-gray-900 text-lg transition-all duration-200 w-1/2">
            {item.name}
          </h4>
          <h5 className="text-small transition-all duration-500 mt-2">
            {formatThoushand(item.total)}
          </h5>
        </div>
        <Link href="/course/#">
          <a className="link-wrapped"></a>
        </Link>
      </div>
    </div>
  );
}
