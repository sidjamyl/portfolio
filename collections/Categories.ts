import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Portfolio',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      required: true,
      admin: { description: 'Lower numbers appear first.' },
    },
    {
      name: 'name',
      type: 'text',
    },
  ],
}

export default Categories
