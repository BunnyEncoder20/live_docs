import CollaborativeRoom from "@/components/CollaborativeRoom"
// import { getDocument } from "@/lib/actions/room.actions";
// import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";



// current Page 📄
const Document = () => {
  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom 

      />
    </main>
  )
}

export default Document