import type { CollectionConfig } from 'payload'
export const Stacks: CollectionConfig = {
  slug: 'stacks',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'StackCategory', 'order'],
    group: 'Portfolio',
  },
  access: { 
    read: () => true,
    },
    lockDocuments: false,
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
            unique: true,
        },
        {
            name: 'icon',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name : 'StackCategory',
            type: 'relationship',
            relationTo: 'categories',
        }
    ],
} 

export default Stacks
