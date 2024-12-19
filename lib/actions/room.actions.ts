'use server';

// utils
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getAccessType, parseStringify } from '../utils';

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
      defaultAccesses: [],
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
export const getDocument = async (roomId: string, userId: string ) => {
  
  try {
    // get room
    const room = await liveblocks.getRoom(roomId);
  
    // check if user have access to the room
    const hasAccess = Object.keys(room.usersAccesses).includes(userId);
  
    if (!hasAccess) {
      throw new Error("You don't have access to this document");
    }
  
    return parseStringify(room);
    
  } catch (error) {
    console.error("Error in getDocument: ", error);
  }
}

// Server action: Get all documents
export const getAllDocuments = async (email: string) => {
  
  try {
    // get rooms
    const rooms = await liveblocks.getRooms({ userId: email });
    // return rooms
    return parseStringify(rooms);
    
  } catch (error) {
    console.error("Error in getAllDocuments: ", error);
  }
}


// Server Action: Update document 
export const udpateDocument = async (
  roomId: string,
  title: string
) => {
  try {
    // update the room metadata uaing liveblocks built in func
    const updatedRoom = await liveblocks.updateRoom( roomId, {
      metadata: {
        title
      }
    });

    // redirect to updated room
    revalidatePath(`/documents/${roomId}`);

    return parseStringify(updatedRoom);
  } catch (error) {
    console.error("Error in updateDocument: ", error)
  }
}


// Server action: update document access 
export const updateDocumentAccess = async ({
  roomId,
  email,
  userType,
  updatedBy,
}: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    }

    // update room
    const room = await liveblocks.updateRoom(roomId, { 
      usersAccesses
    });

    if (room) {
      // Todo: send notification to invited user
    }

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(room);
  } catch (error) {
    console.error("Error in updateDocumentAccess: ", error)
  }
}


// Server action: remove a collab from document
export const removeCollaborator = async ({
  roomId,
  email
}: {
  roomId: string,
  email: string,
}) => {
  try {
    const room = await liveblocks.getRoom(roomId);
    if (room.metadata.email === email) {
      // if owner, we cannot remove you
      throw new Error("You cannot remove the owner (yourself) from the document");
    }

    const updateRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null
      }
    });

    revalidatePath(`/documents/${roomId}`);
    return parseStringify(updateRoom);
  } catch (error) {
    console.log("Error in removeCollaborator: ", error)
  }
}


// Server action: Delete document
export const deleteDocument = async (roomId: string) => {
  try {
    await liveblocks.deleteRoom(roomId);
    revalidatePath('/');
    redirect('/');
  } catch (error) {
    console.log("Error in deleteDocument: ", error)
  }
}