'use client'
import { useState } from 'react'
import TitleOverlay from "../components/TitleOverlay.js";
import MainOverlay from '@/components/MainOverlay'
import GlobeCanvas from '../components/GlobeCanvas.js';
import useLocationData from "@/hooks/useLocationData.js";

export default function Home() {
  const [start, setStart] = useState(false);
  const [location, setLocation] = useState();
  const [locationData, loading, error] = useLocationData(location);

  return (
    <>
      {!start && <TitleOverlay startHandler={setStart}/>}
      {start && <MainOverlay locationData={locationData} />}
      <div className='w-screen h-screen'>
       <GlobeCanvas locationHandler={setLocation} allowClick={locationData != []} />
      </div>
    </>
  );
}
