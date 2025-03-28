import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { setSearchedQuery } from "../../redux/jobSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend developer",
  "Backend developer",
  "Data Science",
  "Graphics Designer",
  "FullStack Developer",
];

const CategoryCarousel = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler = (query) => {
      dispatch(setSearchedQuery(query));
      navigate("/browse");
    };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent >
          {category.map((cat, index) => (
              <CarouselItem className="  md:basis-1/2 lg:basis-1/2 " key={index}>               
                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full ">{cat}</Button>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
