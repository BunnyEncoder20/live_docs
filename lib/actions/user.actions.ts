'use server';

import { liveblocks } from "../liveblocks";
// utils imports
import { parseStringify } from "../utils";

// clerk imports 
import { clerkClient } from "@clerk/nextjs/server";


// Server action
export const getClerkUsers = async ({ userIds }: { userIds: string[]}) => {
  try {
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds,
    });

    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    const sortedUsers = userIds.map((email) => users.find((user) => user.email === email));

    return parseStringify(sortedUsers);
  } catch (error) {
    console.log(`Error fetching users: ${error}`);
  }
}

export const getDocumentUsers = async ({
  roomId,
  currentUser,
  text,
}: {
  roomId: string,
  currentUser: string,
  text: string,
}) => {
  try {
    // fetch room
    const room = await liveblocks.getRoom(roomId);

    // get room users except ourselfs
    const users = Object.keys(room.usersAccesses).filter((email) => email !== currentUser);

    // filter users by what name user is typing
    if (text.length) {
      const lowerCaseText = text.toLowerCase();
      const filteredUsers = users.filter((email: string) => email.toLowerCase().includes(lowerCaseText));
      return parseStringify(filteredUsers);
    }

    // else just return all names 
    return parseStringify(users)
  } catch (error) {
    console.error("Error in getDocumentUsers: ", error);
  }
}