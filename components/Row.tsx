import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline"
import { Movie } from "../typings"
import Thumbnail from "./Thumbnail"
import {useState, useRef} from 'react'

interface Props {
    title: string
    //When using Firebase
    //movie: Movie | DocumentData[]
    movies: Movie[]
}

function Row({title, movies}: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMovied, setIsMovied] = useState(false);

  const handleClick = (direction: string) => {
    setIsMovied(true)

    if (rowRef.current) {
      const {scrollLeft, clientWidth} = rowRef.current

      const scrollTo = direction === 'left' 
      ? scrollLeft - clientWidth 
      : scrollLeft + clientWidth

      rowRef.current.scrollTo({left: scrollTo, behavior: "smooth"})
    }
  }

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
        <h2 className="w-56 cursor-pointer text-sm text-[#e5e5e5] transition font-semibold 
        duration-200 hover:text-white md:text-2xl">{title}</h2>
          <div className="group relative md:-ml-2">
            <ChevronLeftIcon className={`absolute top-0 bottom-0 left-2 z-40 w-9 h-9 cursor-pointer
             transition opacity-0 hover:scale-125 group-hover:opacity-100 m-auto ${!isMovied && 'hidden'}`} 
             onClick={()=> handleClick('left')}/>
                <div ref={rowRef} className="flex scrollbar-hide items-center space-x-0.5 overflow-x-scroll
                 md:space-x-2.5 md:p-2">
                  {
                    movies.map((movie) => (
                      <Thumbnail key={movie.id} movie={movie} />
                    ))
                  }
                </div>            
            <ChevronRightIcon className='absolute top-0 bottom-0 right-2 z-40 w-9 h-9 cursor-pointer
             transition opacity-0 hover:scale-125 group-hover:opacity-100 m-auto' 
             onClick={()=> handleClick('right')}/>
        </div>
    </div>
  )
}

export default Row