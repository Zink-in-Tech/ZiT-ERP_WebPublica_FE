import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'YouTube Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      description: 'Pega la URL del video de YouTube aquí',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Título del video',
      type: 'string',
      description: 'Título opcional para el video',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      url: 'url',
    },
    prepare(selection) {
      const {title, url} = selection
      return {
        title: title || 'Video de YouTube',
        subtitle: url,
        media: 'video',
      }
    },
  },
}) 