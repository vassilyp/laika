'use client'
import TitleOverlay from "components/TitleOverlay"; // Removed the '@' symbol
import { useState } from 'react'
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