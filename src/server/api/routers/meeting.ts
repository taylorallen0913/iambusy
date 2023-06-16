import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const meetingRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const meeting = await ctx.prisma.meeting.create({
        data: {
          name,
          creatorId: ctx.userId,
        },
      });
      return meeting;
    }),
});
