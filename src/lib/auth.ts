import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { findOneDocument, insertDocument } from "./mongodb"
import { User } from "@/types"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos")
        }

        const user = (await findOneDocument("users", {
          email: credentials.email.toLowerCase(),
        })) as unknown as User

        if (!user) {
          throw new Error("Usuario no encontrado")
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password!
        )

        if (!isValid) {
          throw new Error("Contraseña incorrecta")
        }

        return {
          id: user._id!.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub!
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  cookies: {
    sessionToken: {
      name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  useSecureCookies: process.env.NODE_ENV === "production",
}

// Helper function to create initial admin user
export async function createInitialAdmin() {
  const existingAdmin = await findOneDocument("users", { role: "admin" })

  if (!existingAdmin && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12)

    await insertDocument("users", {
      email: process.env.ADMIN_EMAIL.toLowerCase(),
      name: "Administrador",
      password: hashedPassword,
      role: "admin",
    })

    console.log("Initial admin user created")
  }
}
