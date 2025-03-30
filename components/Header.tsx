"use client";
import { UserButton } from '@clerk/nextjs'
import React, { useState } from 'react'
import Logo from './Logo'
import { Switch } from './ui/switch'
import { useDrivingMode } from '@/contexts/DrivingModeContext';
import { Car, User } from 'lucide-react';

function Header() {
  const { isDriving, setIsDriving } = useDrivingMode();
  return (
    <div className='flex justify-between border-b-[4px] border-gray-200 p-4'>
      <Logo/>
      <div className="flex items-center gap-2">
        {!isDriving? <span className="flex lg:text-xl md:text-xl 
        sm:text-sm text-green-400"><User size={26}/></span> 
        : <span className="flex lg:text-xl md:text-xl 
        sm:text-sm text-xl text-black"><User size={26}/></span> }

        <Switch
          checked={isDriving}
          onCheckedChange={(checked: boolean) => {
            setIsDriving(checked);
          }}
          className="w-10 h-6"
        />

        {isDriving ? <span className="flex lg:text-xl md:text-xl 
        sm:text-sm text-green-400"><Car size={30}/><span className='mr-1.5'></span></span> 
        : <span className="flex lg:text-xl md:text-xl 
        sm:text-sm text-black"><Car size={30}/><span className='mr-1.5'></span></span> }
      </div>
      <div>
      <UserButton />
      </div>
    </div>
  )
}

export default Header