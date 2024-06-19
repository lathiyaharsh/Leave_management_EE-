import { useRouter } from 'next/navigation'
import React from 'react'

function StudentComponent() {
    const router = useRouter();
    router.push('/user/leave')
  return (
    <div>StudentComponent</div>
  )
}

export default StudentComponent