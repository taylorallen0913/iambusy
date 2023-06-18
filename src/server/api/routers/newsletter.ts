import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const newsletterRouter = createTRPCRouter({
  subscribe: publicProcedure
    .input(
      z.object({
        email: z.string().email("You must enter a valid email address."),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email } = input;

      // Check if newsletter entry with email exists
      const newsletterExists = !!(await ctx.prisma.newsletter.findFirst({
        where: {
          email,
        },
      }));

      if (newsletterExists) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A newsletter with the provided id already exists.",
        });
      }

      return await ctx.prisma.newsletter.create({ data: { email } });
    }),
});
