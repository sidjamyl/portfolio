import type { CollectionConfig } from 'payload'

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'position',
    defaultColumns: ['position', 'order', 'updatedAt'],
    group: 'Portfolio',
  },
  access: {
    read: () => true,
  },
    lockDocuments: false,
  fields: [
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'period',
      type: 'text',
      admin: { description: 'For example: AUG 2025 → PRESENT.' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}

export default Jobs
