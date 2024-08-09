import React from "react"
import { auth } from "@/auth"

const profile = async () => {
  const session = await auth()
  const sessionString = JSON.stringify(session)
  console.log(sessionString)

  return (
    <main className="flex items-start justify-center">
      <div>{sessionString ? sessionString : "No Session or cant get Session"}</div>
    </main>
  )
}

export default profile
