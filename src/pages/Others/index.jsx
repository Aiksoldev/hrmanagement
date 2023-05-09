const TCamSection = dynamic(() => import("@/components/Others/TCamSection"),{ssr:false}); 
import dynamic from 'next/dynamic';
import React from 'react'

const index = () => {
  return (
    <TCamSection />
  )
}

export default index