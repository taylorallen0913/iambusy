import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const eventRouter = createTRPCRouter({
  all: privateProcedure.query(async ({ ctx }) => {
    const { userId } = ctx;

    const events = ctx.prisma.event.findMany({
      where: { creatorId: userId },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return events;
  }),
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
    .input(z.object({ name: z.string(), description: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { name, description } = input;
      const event = await ctx.prisma.event.create({
        data: {
          name,
          description,
          creatorId: ctx.userId,
        },
      });
      return event;
    }),
  delete: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
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

      // Delete event
      return await ctx.prisma.event.delete({ where: { id } });
    }),
  update: privateProcedure
    .input(
      z.object({
        eventId: z.string(),
        name: z.string().optional(),
        imageUrl: z.string().optional(),
        location: z.string().optional(),
        date: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { eventId, name, imageUrl, location, date } = input;

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
          date,
        },
      });

      return updatedEvent;
    }),
});
