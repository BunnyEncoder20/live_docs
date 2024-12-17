import React from 'react'

// clerk imports
import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return (
    <main className="auth-page">
      <SignUp />
    </main>
  )
}

export default SignUpPage