import React from 'react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

// ui imports
import Header from '@/components/Header'
import AddDocumentBtn from '@/components/AddDocumentBtn'

// Clerk imports
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'



// Home page 📄
const Home = async () => {

  // get user documents
  const documents = []

  // fetch user info
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

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
      {documents.length > 0 ? (
        <div>

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