"use client";

import Image from "next/image";

const carouselData = {
  id: "1",
  image: "/bg.webp",
  title: "Revolutionize QA with Smarter Automation",
  quote: "Jade Inc has completely transformed our testing process. It's reliable, efficient, and ensures our releases are always top-notch.",
  author: "Michael Carter",
  role: "Software Engineer at DevCore",
  avatar: "MC",
};

export function LoginCarousel() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="relative h-full w-full">
        <div className="relative h-full">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={carouselData.image}
              alt={carouselData.title}
              fill
              className="object-cover"
              priority
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/90" />
            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center px-12 xl:px-20 2xl:px-24 py-16">
            <div className="max-w-2xl mx-auto w-full">
              {/* Main Heading */}
              <div className="space-y-6">
                <h2 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight">
                  {carouselData.title}
                </h2>
                <p className="text-lg xl:text-xl 2xl:text-2xl text-white/90 leading-relaxed max-w-xl">
                  {carouselData.quote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
