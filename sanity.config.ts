import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { projectId, dataset } from './sanity/env'
import { schema } from './sanity/schema'

export default defineConfig({
    basePath: '/studio',
    name: 'jhrc_studio',
    title: 'JHRC Studio',
    projectId,
    dataset,
    plugins: [deskTool(), visionTool()],
    schema,
})
