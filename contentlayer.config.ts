import { defineDocumentType, defineNestedType, makeSource } from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'

export const Tag = defineNestedType(() => ({
  name: 'Tag',
  fields: {
    title: { type: 'string' },
    variant: { 
      type: 'enum', 
      options: ['primary', 'primaryOutlined', 'secondary', 'secondaryOutlined', 'alternateOne', 'alternateOneOutlined', 'alternateTwo', 'alternateTwoOutlined'], 
      default: 'primary' 
    },
  },

}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string' },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: Tag },
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
      weight: { type: 'number', required: true },
      draft: { type: 'boolean' },
      vimeo: { type: 'number' },
      youtube: { type: 'string' },
      video_length: { type: 'string' },
      date: { type: 'date', required: true },
      tags: { type: 'list', of: Tag },
      stack: { type: 'list', of: Tag },
      lastmod: { type: 'date' },
      free: { type: 'boolean' },
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

export default makeSource({ 
  contentDirPath: './content', 
  documentTypes: [Blog, Course],
  mdx: {
    rehypePlugins: [
      rehypeSlug, 
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node: { children: string | any[] }) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node: { properties: { className: string[] } }) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node: { properties: { className: string[] } }) {
            node.properties.className = ["word--highlighted"]
          },
        }
      ]
    ]
        
  }
})