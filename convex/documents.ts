import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { Doc, Id } from './_generated/dataModel';

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error('Not logged in');

    const userId = identity.subject;

    const documents = await ctx.db
      .query('documents')
      .withIndex(
        'by_user_parent',
        (q) => q.eq('userId', userId).eq('parentDocument', args.parentDocument) //Esto es para que solo me traiga los documentos que tengan como parentDocument el que le estoy pasando
      )
      .filter((q) => q.eq(q.field('isArchived'), false)) //Esto es para que me traiga los documentos que no esten archivados
      .order('desc') //Esto es para que me traiga los documentos que no esten archivados
      .collect(); //Esto es para que me traiga los documentos que no esten archivados

    return documents;
  },
});

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error('Not logged in');

    const documents = await ctx.db.query('documents').collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id('documents')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error('Not logged in');

    const userId = identity.subject;

    const document = await ctx.db.insert('documents', {
      title: args.title,
      userId,
      parentDocument: args.parentDocument,
      isArchived: false,
      isPublished: false,
    });
    return document;
  },
});
