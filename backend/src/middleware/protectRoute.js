import { requireAuth } from '@clerk/express'
import User from '../models/User.js'

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) return res.status(401).join({message: "Unauthorize - invalid token" })

      // find user in db by clerk id
      const user = await User.findOne({ clerkId })
      if (!user) return res.status(404).join({ message: "User Not Found" })

      // attach user to req
      req.user = user
      next()
    } catch (error) {
      console.error("Error in protectRoute middleware", error)

    }
  }
]