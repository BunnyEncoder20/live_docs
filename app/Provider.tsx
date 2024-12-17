'use client';

// liveblocks imports
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';

// ui imports 
import Loader from '@/components/Loader';


// Provider
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">

      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>

  </LiveblocksProvider>
  )
}

export default Provider