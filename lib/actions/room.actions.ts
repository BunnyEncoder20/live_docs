'use server';

// utils
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';

// nanoid for unique if gen
import { nanoid } from 'nanoid';

// liveblocks util
import { liveblocks } from '@/lib/liveblocks';



// Server actions: Create room (new document)
export const createDocument = async ({
  userId, 
  email 
}: CreateDocumentParams ) => {

  // create a unique id for each room
  const roomId = nanoid();

  try {
    // metadata for room
    const metadata = {
      creatorId: userId,
      email,
      title: 'Untitled',
    }    

    // level of access
    const usersAccesses: RoomAccesses = {
      [email]: ['room:write']
    }

    // Creating room
    const room = await liveblocks.createRoom(roomId, {
      metadata,
      usersAccesses,
      defaultAccesses: ['room:write'],
    });

    // revalidate path (so that new document is displayed)
    revalidatePath('/')

    // return room (whenver returning stuff from server action, parse and stringify it)
    return parseStringify(room)

  } catch (error) {
    console.error("Error while creating a room: ", error)
  }
}


// Server action: Get document
export const getDocument = async ({ roomId, userId }: { roomId: string, userId: string }) => {
  
  try {
    // get room
    const room = await liveblocks.getRoom(roomId);
  
    // Todo: add this check back after testing collaborative room
    // check if user have access to the room
    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);
  
    // if (!hasAccess) {
    //   throw new Error("You don't have access to this document");
    // }
  
    return parseStringify(room);
    
  } catch (error) {
    console.error("Error in getDocument: ", error);
  }
}