'use client'

import React, { useState } from 'react'
import Image from 'next/image'

// liveblocks
import { useSelf } from '@liveblocks/react/suspense'

// ui imports 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Input } from './ui/input'

// component imports
import UserTypeSelector from './UserTypeSelector'
import Collaborator from './Collaborator'
import { updateDocumentAccess } from '@/lib/actions/room.actions'



// current component ⚛️
const ShareModal = ({
  roomId,
  collaborators,
  creatorId,
  currentUserType,
}: ShareDocumentDialogProps) => {
  // states
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [userType, setUserType] = useState<UserType>('viewer')

  // which user is sharing the document
  const user = useSelf();


  // const share document handler
  const shareDocumentHandler = async () => {
    setLoading(true)

    await updateDocumentAccess({
      roomId,
      email,
      userType: userType as UserType,
      updatedBy: user.info
    });

    setLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* trigger */}
      <DialogTrigger asChild>
        <Button className="gradient-blue flex h-9 gap-1 px-4" disabled={currentUserType!=='editor'}>
          <Image 
            src="/assets/icons/share.svg"
            alt="share"
            width={20}
            height={20}
            className="min-w-4 md:size-5"
          />
          <p className="mr-1 hidden sm:block"> Share </p>
        </Button>
      </DialogTrigger>

      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage who can view this document</DialogTitle>
          <DialogDescription>
            Select which users can view or edit this document:
          </DialogDescription>
        </DialogHeader>

        {/* display emails */}
        <Label htmlFor="email" className="mt-6 text-blue-100">
          Email Address
        </Label>
        <div className="flex items-center gap-3">
          <div className="flex flex-1 rounded-md bg-dark-400">
            <Input 
              id="email"
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="share-input"
            />
            <UserTypeSelector 
              userType={userType}
              setUserType={setUserType}
            />
          </div>

          {/* submit button */}
          <Button 
            type="submit"
            onClick={shareDocumentHandler}
            disabled={loading}
            className="gradient-blue flex h-full gap-1 px-5"
          >
            {loading ? "Sending..." : "Invite"}
          </Button>
        </div>

        {/* all the current )already invited collaborators */}
        <div className="my-2 space-y-2">
          <ul className="flex flex-col">
            {collaborators.map((collaborator) => (
              <Collaborator 
                key={collaborator.id}
                roomId={roomId}
                creatorId={creatorId}
                email={collaborator.email}
                collaborator={collaborator}
                user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default ShareModal