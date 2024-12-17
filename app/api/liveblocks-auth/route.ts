// liveblocks imports
import { liveblocks } from "@/lib/liveblocks";

// clerk imports
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// utils imports
import { getUserColor } from "@/lib/utils";



export async function POST(request: Request) {
  // Get clerk user
  const clerkUser = await currentUser();
  if (!clerkUser) redirect("/sign-in");

  // destructure user info
  const { id, firstName, lastName, emailAddresses, imageUrl } = clerkUser;

  // form user in way liveblocks accepts it
  const user = {
    id,
    info: {
      id, 
      name: `${firstName} ${lastName}`,
      email: emailAddresses[0].emailAddress,
      avatar: imageUrl,
      color: getUserColor(id),
    } 
  }

  // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.info.id,
      groupIds: [],
    },
    { userInfo: user.info },
  );

  return new Response(body, { status });
}