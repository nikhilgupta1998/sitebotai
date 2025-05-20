import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  user: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.string(),
    uid: v.string(),
    token: v.optional(v.number())
  }),
  workspace: defineTable({
    message: v.any(),
    fileData: v.optional(v.any()),
    user: v.id("user")
  })
});
