"use client";

import Image from "next/image";
import React, { useRef } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";

export interface Track {
  id: number;
  title: string;
  preview: string;
  album: {
    cover_medium: string;
  };
  artist: {
    name: string;
  };
}

interface MusicCardProps {
  track: Track;
  isPlaying: boolean;
  onPlay: (id: number, audio: HTMLAudioElement) => void;
  onStop: (id: number, audio: HTMLAudioElement) => void;
}

export function MusicCard({ track, isPlaying, onPlay, onStop }: MusicCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleToggle = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      onStop(track.id, audioRef.current);
    } else {
      onPlay(track.id, audioRef.current);
      audioRef.current.play();
    }
  };

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-black relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-white/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-4 border">
        <CardItem translateZ="50" className="text-lg font-bold text-white">
          {track.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-400 text-xs mt-1"
        >
          {track.artist.name}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-3">
          <Image
            src={track.album.cover_medium}
            height={800}
            width={800}
            className="h-48 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt={track.title}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as="button"
            onClick={handleToggle}
            className="px-3 py-1.5 rounded-xl bg-white text-black text-xs font-bold"
          >
            {isPlaying ? "Stop" : "Play"}
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href={`/tracks/${track.id}`}
            className="px-3 py-1.5 rounded-xl text-xs font-normal text-white"
          >
            Details →
          </CardItem>
        </div>
        <audio
          ref={audioRef}
          src={track.preview}
          onEnded={() => onStop(track.id, audioRef.current!)}
        />
      </CardBody>
    </CardContainer>
  );
}

