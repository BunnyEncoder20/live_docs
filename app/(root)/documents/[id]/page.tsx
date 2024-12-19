// next imports
import { redirect } from "next/navigation";

// components imports
import CollaborativeRoom from "@/components/CollaborativeRoom"

// actions imports
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";

// clerk imports
import { currentUser } from "@clerk/nextjs/server"




// current Page 📄
const Document = async ({ 
  params: { id }
}: SearchParamProps) => {

  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');


  // get room and check access
  const room = await getDocument(
    id,
    clerkUser.emailAddresses[0].emailAddress,
  )
  if (!room) redirect('/');

  // extract user data and assign userType
  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });


  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer'
  }))

  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  )
}

export default Document