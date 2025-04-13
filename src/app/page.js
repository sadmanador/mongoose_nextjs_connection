"use client";

import Image from "next/image";

export default function TasksPage() {
  return (
    <div className="flex flex-col items-center  min-h-screen p-4">
      <h1 className="text-4xl font-bold">Unoptimized Image from HTML</h1>
      <img className="img" src="/sample.jpg" alt="sample photo" />
      <div className="mt-4 flex flex-col items-center  min-h-screen p-4">
        <h1 className="text-4xl font-bold">
          Optimized Image from NextJS Image component
        </h1>
        <Image width={300} height={100} src="/sample.jpg" alt="sample Image" />
        <h1 className="text-4xl font-bold">
          Optimized Image from NextJS Image component
        </h1>
        <Image
          width={300}
          height={100}
          src="/sample.jpg"
          alt="sample Image"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4="
        />
      </div>
      <div className="flex flex-col items-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-6">Responsive Optimized Image</h1>

        <div
          className="relative w-full max-w-xl h-64 sm:h-80 md:h-[400px]"
          style={{ borderRadius: "12px", overflow: "hidden" }}
        >
          <Image
            src="/sample.jpg"
            alt="Responsive sample"
            fill
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4="
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
