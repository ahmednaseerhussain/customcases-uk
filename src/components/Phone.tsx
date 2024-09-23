import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';
// import {caseImg} from '../app/configure/design/DesignConfigurator'

interface CaseOption {
  label: string;
  image: string;
}

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  dark?: boolean;
  
}


const Phone = ({ imgSrc, className, dark = false,  ...props }: PhoneProps) => {
  return (
    <div
      className={cn(
        'relative pointer-events-none z-50 overflow-hidden',
        className
      )}
      {...props}>
      {/* <h1>Selected Case: {selectedCase.label}</h1> */}
      <img
        // src={selectedCase.image}
        src='/solid_11_pro.png'
        className='pointer-events-none z-50 select-none'
        alt='phone image'
      />

      <div className='absolute -z-10 inset-0'>
        <img
          className='object-cover min-w-full min-h-full rounded-[40px]'
          src={imgSrc}
          alt='overlaying phone image'
        />
      </div>
    </div>
  );
};


export default Phone;