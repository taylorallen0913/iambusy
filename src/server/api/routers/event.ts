import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  getById: privateProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;

      // Check if event with eventId exists
      const event = await ctx.prisma.event.findUnique({
        where: {
          id,
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The event id provided does not exist.",
        });
      }

      return event;
    }),
  create: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const event = await ctx.prisma.event.create({
        data: {
          name,
          creatorId: ctx.userId,
        },
      });
      return event;
    }),
  update: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
        name: z.string().optional(),
        imageUrl: z.string().optional(),
        location: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, name, imageUrl, location } = input;

      // Check if event with eventId exists
      const event = await ctx.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      if (!event) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "The event id provided does not exist.",
        });
      }

      // Update the event
      const updatedEvent = await ctx.prisma.event.update({
        where: { id: eventId },
        data: {
          name,
          imageUrl,
          location,
        },
      });

      return updatedEvent;
    }),
  modifyAvailability: privateProcedure
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
  getUserEvents: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const events = ctx.prisma.event.findMany({
      where: { creatorId: userId },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return events;
  }),
});
