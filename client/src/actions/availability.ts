"use server"

import {prisma} from "@/lib/prisma"

export const getAvailabilities = async () => {
    return await prisma.availability.findMany()
}