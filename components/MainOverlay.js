'use client'
import SlidingWindow from '@/components/SlidingWindow'
import useLocationStory from '@/hooks/useLocationStory';

export default function MainOverlay({ location }) {

  const [info, loading, error] = useLocationStory(location)

  return(
    <div className='absolute w-screen h-screen'>
      {info && <div className={`bg-black w-full h-full absolute top-0 left-0 ${info ? 'opacity-50' : ''}`} />}

      <SlidingWindow info={info} />
    </div>
  );
}