import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'History Archive Studio',

    projectId: '7xuozr6p',
    dataset: 'production',

    basePath: '/admin',

    plugins: [deskTool(), visionTool()],

    schema: {
        types: schemaTypes,
    },
})
