import { createClient } from 'next-sanity'

export const client = createClient({
    projectId: '7xuozr6p',
    dataset: 'production',
    apiVersion: '2024-02-15',
    useCdn: false, // Set to false if you want fresh data on every request
})
