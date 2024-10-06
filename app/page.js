'use client'
import TitleOverlay from "@/components/TitleOverlay";
import { useState } from 'react'
import MainOverlay from '@/components/MainOverlay'
import GlobeCanvas from '../components/GlobeCanvas.js';

export default function Home() {
  const [start, setStart] = useState(false)

  return (
    <>
      {!start && <TitleOverlay startHandler={setStart}/>}
      {start && <MainOverlay />}
      <GlobeCanvas />
      <div className="w-[500px] h-[500px] bg-blue-500 rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
      </div>
    </>
  );
}
