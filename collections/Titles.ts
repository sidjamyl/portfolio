import type { CollectionConfig } from 'payload'

export const Titles: CollectionConfig = {
  slug: 'titles',
  access: {
    read: () => true,
  },
  lockDocuments: false,
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}

export default Titles
