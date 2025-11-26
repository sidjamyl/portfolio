import type { CollectionConfig } from 'payload'
export const Stacks: CollectionConfig = {
  slug: 'stacks',
  access: { 
    read: () => true,
    },
    lockDocuments: false,
    fields: [   
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