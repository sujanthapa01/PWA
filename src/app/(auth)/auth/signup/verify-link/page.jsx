import React from 'react'
import { Suspense } from 'react'
import VerifyLink from './verifyLink'
export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <VerifyLink/>
    </Suspense>
  )
}
