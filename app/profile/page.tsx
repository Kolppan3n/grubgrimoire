import React from "react"
import { auth } from "@/auth"

const profile = async () => {
  const session = await auth()
  const sessionString = JSON.stringify(session)
  console.log(sessionString)

  return (
    <main className="flex items-center justify-center">
      {session ? (
        <div className="flex flex-col items-center">
          <p>{`Name: ${session.user?.name}`}</p>
          <p>{`Email: ${session.user?.email}`}</p>
          <p>{`ID: ${session.user?.id}`}</p>
          <img className="" src={session?.user?.image ? session.user.image : ""} />
        </div>
      ) : (
        <></>
      )}
    </main>
  )
}

export default profile
