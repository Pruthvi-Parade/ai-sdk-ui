'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  return (
    <div className='container'>
      <button onClick={()=>{router.push('/chat/document/-qwerty')}}>Document</button>
      <button onClick={()=>{router.push('/chat/folder/-asdfgh')}}>Collection</button>
    </div>
  );
}