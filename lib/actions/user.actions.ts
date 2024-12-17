'use server';

// utils imports
import { parseStringify } from "../utils";

// clerk imports 
import { clerkClient } from "@clerk/nextjs/server";


// Server action
export const getClerkUsers = async ({ userIds }: { userIds: string[] }) => {
  try {
    // fetch all users clerk info
    const { data } = await clerkClient.users.getUserList({
      emailAddress: userIds
    });

    // convert it into users map
    const users = data.map((user) => ({
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      avatar: user.imageUrl,
    }));

    // sort the users by userId
    const sortedUsers = userIds.map((email) => users.find((user) => user.email === email));

    return parseStringify(sortedUsers);

  } catch (error) {
    console.error("Error while fetching users", error);
  }
}