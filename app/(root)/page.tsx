import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

// ui imports
import Header from '@/components/Header'
import AddDocumentBtn from '@/components/AddDocumentBtn'

// Clerk imports
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

// Server Actions
import { getAllDocuments } from '@/lib/actions/room.actions'

// utils import 
import { dateConverter } from '@/lib/utils'
import DeleteModal from '@/components/DeleteModal'


// Home page 📄
const Home = async () => {

  // fetch user info
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  // fetch user documents
  const roomDocuments = await getAllDocuments(clerkUser.emailAddresses[0].emailAddress)
  
  return (
    <main className="home-container">

      {/* Header section */}
      <Header className="sticky left-0 top-0">
        <div className='flex items-center gap-2 lg:gap-4'>
          {/* Todo: Add notification */}
          Notifications

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>


      {/* Documents lists */}
      {roomDocuments.data.length > 0 ? (
        <div className='document-list-container'>
          <div className="document-list-title">
            <h3 className="text-28-semibold">
              Your Documents
            </h3>

            {/* Add documents btn */}
            <AddDocumentBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>

          {/* list */}
          <ul className="document-ul">
            {roomDocuments.data.map(({id, metadata, createdAt}: any) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image src="/assets/icons/doc.svg" alt="file" height={40} width={40} />
                  </div>
                  <div className="space-y-1">
                    <p className='line-clamp-1 text-lg'>
                      { metadata.title }
                    </p>
                    <p className="text-sm font-light text-blue-100">
                      Created about: { dateConverter(createdAt) }
                    </p>
                  </div>
                </Link>

                {/* Todo: Add delete button */}
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="empty docs"
            height={40}
            width={40}
            className="mx-auto"
          /> 

          {/* Create a new document button */}
          <AddDocumentBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  )
}

export default Home