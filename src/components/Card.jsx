import React from "react";
import newsPoster from "../assets/news-poster.jpg";

function Card({ title, description, link, image_url, index}) {
  if (index === 0 || index === 1)
  // #e0fbff
    return (
      <div className="w-full lg:w-[45%] xl:w-[48%] rounded-2xl p-5 m-3 mb-6 bg-[#d7f2f7] shadow-lg text-[#3c3a3a]">
        <div className="w-full mx-auto h-[25rem] rounded-2xl overflow-hidden">
          <img
            src={image_url || newsPoster}
            alt="News Poster"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div>
          <h1 className="font-semibold text-xl text-center lg:text-left mt-3">
            {title}
          </h1>
          <p className="mt-3 text-center lg:text-left">{description}</p>
          <a
            className="p-3 mt-3 bg-black transition-all hover:bg-[#3a3939] hover:scale-[1.05] text-white  rounded-xl block w-full lg:w-fit text-center"
            href={link}
            target="_blank"
          >
            Read More
          </a>
        </div>
      </div>
    );

  return (
    <div className="w-full sm:w-[45%] md:w-[45%] lg:w-full rounded-2xl p-3 mx-3 mb-3 bg-[#e0fbff] shadow-lg text-black flex-col lg:flex-row flex items-center">
      <div className="w-full lg:w-[15rem]  h-auto lg:h-[90%] rounded-2xl overflow-hidden lg:mr-10 ">
        <img
          src={image_url || newsPoster}
          alt="News Poster"
          className="rounded-2xl h-full object-cover object-center"
        />
      </div>
      <di>
        <h1 className="font-semibold sm:text-xl md:text-lg sm:text-[1rem] sm:leading-[1.2] text-center lg:text-left mt-3">
          {title}
        </h1>
        <p className="mt-3 text-center text-[0.9rem] md:text-sm sm:text-sm lg:text-left">
          {description}
        </p>
        <a
          className="p-3 mt-3 bg-black text-white  rounded-xl block w-full lg:w-fit text-center transition-all hover:bg-[#3a3939] hover:scale-[1.05]"
          href={link}
          target="_blank"
        >
          Read More
        </a>
      </di>
    </div>
  );
}

export default Card;
