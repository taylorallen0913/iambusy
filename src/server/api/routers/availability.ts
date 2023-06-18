import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const availabilityRouter = createTRPCRouter({
  updateAvailability: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
        utcStartTime: z.date(),
        utcEndTime: z.date(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, utcStartTime, utcEndTime } = input;
      const { userId } = ctx;

      // Check if event with eventId exists
      const eventExists = !!(await ctx.prisma.event.findFirst({
        where: {
          id: eventId,
        },
      }));

      if (!eventExists) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The event id provided does not exist.",
        });
      }

      return await ctx.prisma.userAvailability.upsert({
        where: {
          userId_eventId: {
            userId,
            eventId,
          },
        },
        update: {
          utcStartTime,
          utcEndTime,
        },
        create: {
          utcStartTime,
          utcEndTime,
          eventId,
          userId,
        },
      });
    }),
});
