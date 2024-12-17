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




// Current component ⚛️
const CollaborativeRoom = () => {
  return (
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">


          {/* Header */}
          <Header>
            <div className="flex w-fit items-center justify-center gap-2">
              <p className="document-title">
                Document_Title
              </p>
            </div>

            {/* clerk sign in and sign out */}
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

          </Header>

          {/* Editor */}
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollaborativeRoom