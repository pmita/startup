import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    stack: { type: 'list', of: { type: 'string' } },
    image: { type: 'string' },
    imageAlt: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    }, 
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  }
  },
}))

export const Course = defineDocumentType(() => ({
    name: 'Courses',
    filePathPattern: `courses/**/*.mdx`,
    contentType: 'mdx',
    fields: {
      title: { type: 'string', required: true },
      description: { type: 'string' },
      draft: { type: 'boolean' },
      vimeo: { type: 'string' },
      youtube: { type: 'string' },
      video_length: { type: 'number' },
      date: { type: 'date', required: true },
      lastmod: { type: 'date' },
    },
    computedFields: {
      slug: {
        type: 'string',
        resolve: (doc) => `/${doc._raw.flattenedPath}`,
      }, 
      slugAsParams: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
      }
    }

}))

export default makeSource({ contentDirPath: './content', documentTypes: [Blog, Course]})