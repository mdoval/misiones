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