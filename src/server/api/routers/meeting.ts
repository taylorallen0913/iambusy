import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const meetingRouter = createTRPCRouter({
  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      // Check if meeting with meetingId exists
      const meeting = await ctx.prisma.meeting.findUnique({
        where: {
          id,
        },
      });

      if (!meeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The meeting id provided does not exist.",
        });
      }

      return meeting;
    }),
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
  update: privateProcedure
    .input(
      z.object({
        meetingId: z.string(),
        name: z.string().optional(),
        imageUrl: z.string().optional(),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { meetingId, name, imageUrl, location } = input;

      // Check if meeting with meetingId exists
      const meeting = await ctx.prisma.meeting.findUnique({
        where: {
          id: meetingId,
        },
      });

      if (!meeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The meeting id provided does not exist.",
        });
      }

      // Update the meeting
      const updatedMeeting = await ctx.prisma.meeting.update({
        where: { id: meetingId },
        data: {
          name,
          imageUrl,
          location,
        },
      });

      return updatedMeeting;
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

      // Check if meeting with meetingId exists
      const meetingExists = !!(await ctx.prisma.meeting.findFirst({
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
  getUserMeetings: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const meetings = ctx.prisma.meeting.findMany({
      where: { creatorId: userId },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return meetings;
  }),
});
