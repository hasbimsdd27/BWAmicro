import React from "react";

import Link from "next/link";

import IconPlay from "public/images/icon-play.svg";

export default function RenderItem({ item, key }) {
  return (
    <div className="w-1/4 px-4" key={key}>
      <div className="item relative">
        <figure className="item-image">
          <IconPlay />
          <img
            src={item?.thumbnail || ""}
            alt={item?.description || item?.name}
          />
        </figure>
        <div className="item-meta mt-2">
          <h4 className="text-lg text-gray-900">
            {item?.name || "Course Name"}
          </h4>
          <h5 className="text-sm text-gray-600">
            {item?.level || "Course Level"}
          </h5>
        </div>
        <Link href="/course/[slug]" as={`/course/${item.id}`}>
          <a className="link-wrapped"></a>
        </Link>
      </div>
    </div>
  );
}
