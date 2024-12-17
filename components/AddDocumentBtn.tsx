'use client';

import React from 'react'
import Image  from 'next/image'
import { useRouter } from 'next/navigation';

// ui imports
import { Button } from './ui/button'

// server action
import { createDocument } from '@/lib/actions/room.actions';


// curernt component ⚛️
const AddDocumentBtn = ({
  userId,
  email,
}: AddDocumentBtnProps) => {

  // router for nav
  const router = useRouter();

  // Create new document handler
  const addDocumentHandler = async () => {
    try {

      // create a new room for the document
      const room = await createDocument({
        userId,
        email,
      });


      // redirect to that room
      if (room){
        router.push(`/documents/${room.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <Button type='submit' onClick={addDocumentHandler} className="gradient-blue felx gap-1 shadow-md">
      {/* plus icon */}
      <Image 
        src="/assets/icons/add.svg"
        alt="add"
        height={24}
        width={24}
      />

      {/* text */}
      <p className="hidden sm:block">
        Start a blank Document
      </p>
    </Button>
  )
}

export default AddDocumentBtn