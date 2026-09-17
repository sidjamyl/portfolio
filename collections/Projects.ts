import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'section', 'order', 'type'],
    group: 'Portfolio',
  },
  access: {
    read: () => true,
    },
    lockDocuments: false,
    fields: [
        {
            name: 'section',
            type: 'select',
            options: [
                { label: 'Client work', value: 'clients' },
                { label: 'Projects', value: 'projects' },
            ],
            defaultValue: 'projects',
            required: true,
        },
        {
            name: 'order',
            type: 'number',
            defaultValue: 0,
            required: true,
            admin: { description: 'Lower numbers appear first within the section.' },
        },
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
            name: 'tags',
            type: 'text',
            admin: { description: 'Comma-separated technologies or disciplines.' },
        },
        {
            name: 'highlights',
            type: 'text',
            admin: { description: 'Three short highlights separated by semicolons.' },
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
