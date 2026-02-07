"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PeacePlayVideo } from "@/types/peacePlay";

interface RankingCardProps {
  video: PeacePlayVideo;
  rank: number;
}

const RankingCard = ({ video, rank }: RankingCardProps) => {
  const router = useRouter();

  // Color for rank 1-3
  let rankColor = "text-white";
  let strokeColor = "text-gray-800";
  
  if (rank === 1) { rankColor = "text-yellow-400"; strokeColor = "text-yellow-900"; }
  else if (rank === 2) { rankColor = "text-gray-300"; strokeColor = "text-gray-600"; }
  else if (rank === 3) { rankColor = "text-amber-600"; strokeColor = "text-amber-900"; }

  return (
    <div 
      className="relative w-full h-[280px] md:h-[320px] rounded-[16px] overflow-visible cursor-pointer group flex items-end pl-8 md:pl-16 pr-2 mb-4"
      onClick={() => router.push(`/project/projectDetail?id=${video.videoId}`)}
    >
      {/* Big Rank Number - Positioned absolute left/bottom to overlap nicely */}
      <div 
        className={`absolute -left-2 bottom-0 z-20 font-black text-[120px] md:text-[160px] leading-none tracking-tighter drop-shadow-2xl select-none transition-transform group-hover:scale-110 origin-bottom-left ${rankColor}`}
        style={{ 
            textShadow: '4px 4px 0px rgba(0,0,0,0.5)',
            WebkitTextStroke: '2px rgba(255,255,255,0.1)'
        }}
      >
        {rank}
      </div>

      {/* Card Content */}
      <div className="relative w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden shadow-xl border border-white/10 group-hover:border-cyan-500/50 transition-all duration-300 bg-[#121212]">
         {/* Image */}
         {video.thumbnailUrl ? (
             <Image 
                src={video.thumbnailUrl} 
                alt={video.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
             />
         ) : (
            <div className="w-full h-full bg-gray-900" />
         )}

         {/* Gradient Overlay */}
         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

         {/* Info */}
         <div className="absolute bottom-0 left-0 right-0 p-4 pl-12 md:pl-20">
            <h3 className="text-white font-bold text-lg md:text-xl truncate group-hover:text-cyan-400 transition-colors">
                {video.title}
            </h3>
            <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" /></svg>
                    {(video.views || 0).toLocaleString()} Views
                </span>
                <span>•</span>
                <span>{video.category || 'Movie'}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default RankingCard;
