import { groq } from 'next-sanity'

export const allArticlesQuery = groq`
  *[_type == "article"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    "category": category->title,
    "categorySlug": category->slug.current,
    heroImage,
    publishedAt,
    readingTime,
    featured,
  }
`

export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    "category": category->title,
    "categorySlug": category->slug.current,
    heroImage,
    publishedAt,
    readingTime,
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    }
  }
`

export const articlesByCategoryQuery = groq`
  *[_type == "article" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    "category": category->title,
    "categorySlug": category->slug.current,
    heroImage,
    publishedAt,
    readingTime,
  }
`

export const allCategoriesQuery = groq`
  *[_type == "category"] {
    title,
    "slug": slug.current,
    description,
    icon,
  }
`
