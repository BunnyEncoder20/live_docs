'use client';

// components imports 
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'

// Clerk imports
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

// LiveBlocks imports 
import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense'

// ui imports 
import Loader from './Loader';
import ActiveCollaborators from './ActiveCollaborators';




// Current component ⚛️
const CollaborativeRoom = ({
  roomId,
  roomMetadata
}: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">


          {/* Header Comp */}
          <Header>
            <div className="flex w-fit items-center justify-center gap-2">
              <p className="document-title">
                Document_Title
              </p>
            </div>

            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              {/* collaborators */}
              <ActiveCollaborators />


              {/* clerk sign in and sign out */}
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>

          {/* Editor */}
          <Editor 
            // roomId={roomId}
          />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom