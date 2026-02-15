export const article = {
    name: 'article',
    title: 'History Article',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'subtitle',
            title: 'Subtitle',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    'WARFARE', 'ARTIFACTS', 'KNOWLEDGE', 'TECHNICAL', 'PHILOSOPHY', 'SCIENCE'
                ]
            }
        },
        {
            name: 'era',
            title: 'Era',
            type: 'string',
        },
        {
            name: 'region',
            title: 'Region',
            type: 'string',
        },
        {
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'readTime',
            title: 'Read Time',
            type: 'string',
        },
        {
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                { type: 'block' },
                { type: 'image' },
                {
                    type: 'object',
                    name: 'quote',
                    title: 'Quote',
                    fields: [
                        { name: 'text', type: 'text', title: 'Quote Text' },
                        { name: 'cite', type: 'string', title: 'Citation' }
                    ]
                }
            ],
        },
    ],
}
