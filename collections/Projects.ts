import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    read: () => true,
    },
    lockDocuments: false,
    fields: [
        {
            name: 'title',
            type: 'text',
            unique: true,
        },
        {   
            name: 'description',
            type: 'textarea',
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