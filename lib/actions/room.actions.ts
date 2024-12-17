'use server';

// utils
import { revalidatePath } from 'next/cache';
import { parseStringify } from '../utils';

// nanoid for unique if gen
import { nanoid } from 'nanoid';

// liveblocks util
import { liveblocks } from '@/lib/liveblocks';



// Server action
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