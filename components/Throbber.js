import Image from 'next/image';
import Sun from '@/imgs/sun.png';

export default function Throbber() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Image 
        src={Sun} 
        width={100} 
        height={100} 
        alt="☀️" 
        className="animate-spin filter brightness-0 invert" 
      />
    </div>
  );
}
