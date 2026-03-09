import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

const components: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            if (!value?.asset) return null;
            return (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', margin: '40px 0', borderRadius: '24px', overflow: 'hidden' }}>
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || 'Article Image'}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 1200px) 100vw, 800px"
                    />
                    {value.caption && (
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: '12px 24px',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                            color: 'white',
                            fontSize: '0.85rem',
                            fontWeight: 500
                        }}>
                            {value.caption}
                        </div>
                    )}
                </div>
            )
        },
        divider: () => <hr style={{ border: 'none', height: '1px', background: 'var(--border-color)', margin: '60px 0' }} />,
    },
    block: {
        h2: ({ children }: any) => (
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '60px', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                {children}
            </h2>
        ),
        h3: ({ children }: any) => (
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--foreground)', marginTop: '40px', marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {children}
            </h3>
        ),
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
