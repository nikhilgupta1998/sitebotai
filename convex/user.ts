import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
    args: {
        name: v.string(),
        email: v.string(),
        picture: v.string(),
        uid: v.string()
    },
    handler: async (ctx, args) => {
        // Example logic: insert user into database
        const user = await ctx.db.query("user").filter(q => q.eq(q.field('email'), args.email)).collect()
        if (user?.length === 0) {
            const result = await ctx.db.insert("user", {
                name: args.name,
                email: args.email,
                picture: args.picture,
                uid: args.uid,
                token: 50000
            })
            return result
        }



    }
})

export const GetUser = query({
    args: {
        email: v.string()
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.query("user").filter(q => q.eq(q.field('email'), args.email)).collect()
        return user[0]

    }
})


export const UpdateToken = mutation({
    args: {
        token: v.number(),
        userId: v.id("user")
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.patch(args.userId, {
            token: args.token
        })
        return result
    }
})