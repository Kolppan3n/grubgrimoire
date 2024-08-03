import { Person, insertPerson } from "@/lib/db"

async function main() {
    const newPerson: Person = {
        email: "foo@example.com",
        image: "some image url",
        name: "foo"
    }
    await insertPerson(newPerson)
    process.exit()
}

main()