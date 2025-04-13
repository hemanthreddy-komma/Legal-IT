"use server"

import { cookies } from "next/headers"
import { connectToDatabase } from "@/lib/mongodb"
import { User } from "@/models/user"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET
const TOKEN_EXPIRY = "7d"

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined")
}

export async function registerUser({
  name,
  email,
  password,
}: {
  name: string
  email: string
  password: string
}) {
  try {
    if (!name || !email || !password) {
      return { success: false, error: "All fields are required" }
    }

    await connectToDatabase()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { success: false, error: "Email already in use" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    )

    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    })

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Failed to register user" }
  }
}

export async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    if (!email || !password) {
      return { success: false, error: "All fields are required" }
    }

    await connectToDatabase()

    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { success: false, error: "Invalid email or password" }
    }

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, name: user.name },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    )

    cookies().set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    })

    return {
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Failed to login" }
  }
}

export async function checkAuthStatus() {
  try {
    const token = cookies().get("auth-token")?.value
    if (!token) {
      return { authenticated: false, user: null }
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string
      email: string
      name: string
    }

    return {
      authenticated: true,
      user: {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
      },
    }
  } catch (error) {
    console.error("Auth check error:", error)
    return { authenticated: false, user: null }
  }
}

export async function logoutUser() {
  try {
    cookies().delete("auth-token")
    return { success: true }
  } catch (error) {
    console.error("Logout error:", error)
    return { success: false, error: "Failed to logout" }
  }
}
