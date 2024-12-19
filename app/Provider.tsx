'use client';

// liveblocks imports
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';

// utils imports
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';

// ui imports 
import Loader from '@/components/Loader';

// clerk imports
import { useUser } from '@clerk/nextjs';


// Provider
const Provider = ({ children }: { children: React.ReactNode }) => {

  // fetch clerk users 
  const {user: clerkUser} = useUser();
  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"

      // users of document (room) resolver
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds});

        return users;
      }}

      // @ mentions users resolver
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        })

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider