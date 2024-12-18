'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

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
import { Input } from './ui/input';

// Server actions imports
import { udpateDocument } from '@/lib/actions/room.actions';



// Current component ⚛️
const CollaborativeRoom = ({
  roomId,
  roomMetadata
}: CollaborativeRoomProps) => {

  // states
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [documentTitle, setDocumentTitle] = useState(roomMetadata.title)

  // refs
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // TODO: current user type
  const currentUserType = 'editor'

  // update title handler
  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setLoading(true);

      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await udpateDocument(roomId, documentTitle);

          if ( updatedDocument ) {
            setEditing(false);
          }
        }
      } catch (error) {
        console.error("Error in Updating title: ", error)
      } finally {
        setLoading(false);
      }
    }
  }

  // use Effects 
  useEffect(() => {

    // when click outside, listen for that mouse event after we have a conatiner ref (after editing title)
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)){
        udpateDocument(roomId, documentTitle)
        setEditing(false)
      }
    }

    // add and remove the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [roomId, documentTitle]);

  useEffect(() => {
    // focus on input  when editing title
    if (editing && inputRef.current) {
      inputRef.current?.focus();
    }
  },[editing]);
  

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">


          {/* Header Comp */}
          <Header>
            <div ref={containerRef} className="flex w-fit items-center justify-center gap-2">

              {/* document title */}
              {editing && !loading ? (
                <Input 
                  type='text'
                  value={documentTitle}
                  ref={inputRef}
                  placeholder='Enter document title'
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p className="document-title">
                    { documentTitle }
                  </p>
                </>
              )}

              {/* Edit icon: User is editor */}
              {currentUserType === 'editor' && !editing && (
                <Image 
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  height={24}
                  width={24}
                  onClick={() => setEditing(true)}
                  className="pointer"
                />
              )}

              {/* User type is not editor */}
              {currentUserType !== 'editor' && !editing && (
                <p className="view-only-tag">
                  View Only
                </p>
              )}

              {/* loader */}
              {loading && (
                <p className="text-sm text-grey-400">
                  saving...
                </p>
              )}

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