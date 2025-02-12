import { Suspense } from "react"
import SetUsername from "./setUername"
function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <SetUsername/>
    </Suspense>
  )
}

export default page