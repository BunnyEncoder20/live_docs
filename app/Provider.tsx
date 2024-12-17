'use client';

// liveblocks imports
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';

// utils imports
import { getClerkUsers } from '@/lib/actions/user.actions';

// ui imports 
import Loader from '@/components/Loader';


// Provider
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users
      }}
    >

      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>

  </LiveblocksProvider>
  )
}

export default Provider