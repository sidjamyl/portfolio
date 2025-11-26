import type { CollectionConfig } from 'payload'
export  const Tests: CollectionConfig = {
  slug: 'tests',
  admin: {  
    useAsTitle: 'name',

    },
    fields: [
        {      
            name: 'name',
            type: 'text',
            unique: true,
        },],
}