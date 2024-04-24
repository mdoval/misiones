import { PrismaClient } from "@prisma/client/extension"
import type { Adapter } from "next-auth/adapters"
 
export default function MyAdapter(prisma: PrismaClient): Adapter {
  const p = prisma as PrismaClient
  return {
    // your adapter methods here
  }
}

/*import { PrismaClient, User } from "@prisma/client";
import { Adapter, AdapterUser } from "next-auth/adapters";

export default function MyAdapter(client: PrismaClient): Adapter {   
    const p = client as PrismaClient
    return {
      async createUser(user: AdapterUser) {
        return p.user.create({data: {name: "Juan", email: "juan@pepe.com", password: "pepepepe"}})
      },
      async getUser() {
        return
      },
      async getUserByEmail() {
        return
      },
      async getUserByAccount() {
        return
      },
      async updateUser() {
        return
      },
      async deleteUser() {
        return
      },
      async linkAccount() {
        return
      },
      async unlinkAccount() {
        return
      },
    }
  }*/