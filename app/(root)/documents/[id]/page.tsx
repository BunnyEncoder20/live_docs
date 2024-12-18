// next imports
import { redirect } from "next/navigation";

// components imports
import CollaborativeRoom from "@/components/CollaborativeRoom"

// actions imports
import { getDocument } from "@/lib/actions/room.actions";
// import { getClerkUsers } from "@/lib/actions/user.actions";

// clerk imports
import { currentUser } from "@clerk/nextjs/server"




// current Page 📄
const Document = async ({ 
  params: { id }
}: SearchParamProps) => {

  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  // get room and check access
  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  })
  if (!room) redirect('/');

  // Todo access the permissions of the user to access the document (read/edit)

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 
        roomId={id}
        roomMetadata={room.metadata}
      />
    </main>
  )
}

export default Document