import { useState } from "react";
import { imageUrl } from "../api/tmdbSpi";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function MovieItem({ movie }: any) {
  const [like, setLike] = useState(false);
  const { title, backdrop_path } = movie;
  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] rounded-lg m-2 inline-block overflow-hidden cursor-pointer">
      <img src={imageUrl(backdrop_path, "w500")} alt={title} />
      <div className="absolute top-0 w-full h-full bg-black/80 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-100 ease-in">
        <p className="p-2 text-sm text-gray-300 font-n-medium tracking-wide">
          {title}
        </p>
        <p onClick={() => setLike((prev) => !prev)}>
          {like ? (
            <FaHeart className="absolute top-2 left-2 text-red-600" size={20} />
          ) : (
            <FaRegHeart
              className="absolute top-2 left-2 text-gray-300"
              size={20}
            />
          )}
        </p>
      </div>
    </div>
  );
}
