import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'updatedAt'],
    group: 'Portfolio',
  },
  access: {
    read: () => true,
    },
    lockDocuments: false,
    fields: [
        {
            name: 'title',
            type: 'text',
            unique: true,
            required: true,
        },
        {   
            name: 'description',
            type: 'textarea',
            required: true,
        },
        {
            name: 'media',
            type: 'relationship',
            relationTo: 'media',
            unique: true,
        },
        {
            name : 'type',
            type: 'textarea',
            admin: {
              description: 'Ex: Web app, AI app, Landing page, Hackathon.',
            },
        },
        {
            name: 'githubLink',
            type: 'text',
        },
         {
            name: 'CodeLink',
            type: 'text',
         }
    ],
}
export default Projects;
