import { LoadingCommentCard } from 'components/organisms/card/LoadingCommentCard'
import { LoadingHotelCard } from 'components/organisms/card/LoadingHotelCard'
import React, { memo } from 'react'

export const LoadingPostPage = memo(() => {
  return (
    <div className="flex flex-col animate-pulse space-y-2 items-center px-2 w-full min-h-screen">
      <p className="w-1/2 text-3xl text-center font-semibold bg-green-200 rounded-lg h-12"></p>
      <div className="flex md:flex-row flex-col justify-center items-center md:space-x-3 md:space-y-0 space-y-3 w-full">
        <div className="flex flex-col justify-between space-y-8 ">
          <div className="w-96 h-64 rounded-lg bg-green-200"></div>
          <div className="flex flex-row justify-between">
            <div className="h-7 w-12 rounded-lg bg-green-200"></div>
            <div className="h-7 w-14 rounded-lg bg-green-200"></div>
            <div className="h-7 w-64 rounded-lg bg-green-200"></div>
          </div>
        </div>
        <div className=" w-96 h-80 flex flex-col space-y-2 rounded-lg">
          <div className="w-full h-72 p-2 space-y-3 overflow-auto bg-green-200 rounded-lg">
            {[...Array(4)]
              .map((_, i) => i)
              ?.map((i) => (
                <LoadingCommentCard key={i} />
              ))}
          </div>
          <div className="h-10 w-full bg-green-200 rounded-lg"></div>
          <div className="w-full flex flex-row space-x-2 h-10">
            <div className=" w-44"></div>
            <div className="w-32 rounded-lg bg-green-200"></div>
            <div className="w-16 rounded-lg bg-green-200"></div>
            <div className="w-24 rounded-full bg-green-200"></div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 md:space-x-2 md:space-y-0 space-y-3 md:w-full w-96 pt-5 rounded-lg">
        <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 bg-green-200 rounded-lg p-2">
          {[...Array(4)]
            .map((_, i) => i)
            ?.map((i) => (
              <LoadingHotelCard key={i} />
            ))}
        </ul>
        <ul className="flex flex-col overflow-auto space-y-2 w-full h-96 bg-green-200 rounded-lg p-2">
          {[...Array(4)]
            .map((_, i) => i)
            ?.map((i) => (
              <LoadingHotelCard key={i} />
            ))}
        </ul>
      </div>
      <div className="w-full md:h-96 h-56 bg-green-200 rounded-lg"></div>
    </div>
  )
})
