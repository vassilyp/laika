import Image from 'next/image';
import Sun from '@/imgs/sun.png';

export default function Throbber({ loading }) {
  return (
    <div className={`${loading ? 'bg-black' : 'bg-none'} ease-in-out duration-[1500ms] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}>
      {/* <Image 
        src={Sun} 
        width={100} 
        height={100} 
        alt="sun" 
        className="animate-spin filter brightness-0 invert" 
      /> */}
    </div>
  );
}
