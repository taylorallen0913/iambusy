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
  modifyAvailability: privateProcedure
    .input(
      z.object({
        meetingId: z.string(),
        utcStartTime: z.date(),
        utcEndTime: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { meetingId, utcStartTime, utcEndTime } = input;
      const { userId } = ctx;

      return await ctx.prisma.userAvailability.upsert({
        where: {
          userId_meetingId: {
            userId,
            meetingId,
          },
        },
        update: {
          utcStartTime,
          utcEndTime,
        },
        create: {
          utcStartTime,
          utcEndTime,
          meetingId,
          userId,
        },
      });
    }),
});
