import { TRPCError } from "@trpc/server";
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

      const meeting = await ctx.prisma.userAvailability.findFirst({
        where: {
          id: meetingId,
        },
      });
      console.log("\n\n\n\n\nhere\n\n\n\n\n");

      console.log(meeting);

      // Check if meeting with meetingId exists
      const meetingExists = !!(await ctx.prisma.userAvailability.findFirst({
        where: {
          id: meetingId,
        },
      }));

      if (!meetingExists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The meeting id provided does not exist.",
        });
      }

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
