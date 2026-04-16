import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.image'
import InteractiveImage from './InteractiveImage'

const components: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) return null;
            return (
                <div style={{ margin: '40px 0' }}>
                    <InteractiveImage
                        src={urlFor(value).url()}
                        alt={value.alt || 'Article Image'}
                        caption={value.caption}
                    />
                </div>
            )
        },
        divider: () => <hr style={{ border: 'none', height: '1px', background: 'var(--border-color)', margin: '60px 0' }} />,
    },
    block: {
        h2: ({ children }: any) => {
            const id = children?.[0]?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
                <h2 id={id} style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '60px', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                    {children}
                </h2>
            )
        },
        h3: ({ children }: any) => {
            const id = children?.[0]?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
            return (
                <h3 id={id} style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                    {children}
                </h3>
            )
        },
        normal: ({ children }: any) => (
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: 'var(--muted)', marginBottom: '24px' }}>
                {children}
            </p>
        ),
        blockquote: ({ children }: any) => (
            <blockquote style={{
                borderLeft: '4px solid var(--accent)',
                paddingLeft: '24px',
                margin: '48px 0',
                fontSize: '1.25rem',
                fontWeight: 600,
                fontStyle: 'italic',
                color: 'var(--foreground)',
                lineHeight: 1.6
            }}>
                {children}
            </blockquote>
        ),
    },
}

export default function PortableTextRenderer({ value }: { value: any }) {
    return <PortableText value={value} components={components} />
}
