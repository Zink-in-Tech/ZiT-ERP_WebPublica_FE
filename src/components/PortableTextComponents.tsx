import React from 'react';
import type {
  PortableTextBlock,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from '@portabletext/react';
import { toPlainText } from '@portabletext/toolkit';
import { normalizeHref } from '../lib/blogMarkdown';
import { urlFor } from '../lib/sanity';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type BlockProps = PortableTextComponentProps<PortableTextBlock & { anchorId?: string }>;

interface SanityImageValue {
  asset?: { _ref?: string; _id?: string; url?: string };
  crop?: unknown;
  alt?: string;
  caption?: string;
}

interface YouTubeValue {
  url?: string;
  title?: string;
}

interface CodeValue {
  code?: string;
  language?: string;
  filename?: string;
}

interface TableValue {
  caption?: string;
  hasHeader?: boolean;
  rows?: Array<{ _key?: string; cells?: unknown[] } | null>;
}

const IMAGE_WIDTHS = [640, 960, 1440];

export function getYouTubeVideoId(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.toLowerCase().replace(/^(www|m)\./, '');
    let id: string | null = null;
    if (host === 'youtu.be') id = parsed.pathname.split('/')[1] ?? null;
    else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
      id = parsed.pathname === '/watch'
        ? parsed.searchParams.get('v')
        : parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/)?.[1] ?? null;
    }
    return id && /^[\w-]{11}$/.test(id) ? id : null;
  } catch {
    return null;
  }
}

function imageDimensions(value: SanityImageValue): { width: number; height: number } | null {
  if (value.crop) return null;
  const match = value.asset?._ref?.match(/-(\d+)x(\d+)-[a-z0-9]+$/i);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
}

const ImageBlock = ({ value }: { value: SanityImageValue }) => {
  if (!value?.asset?._ref && !value?.asset?._id && !value?.asset?.url) return null;

  let src: string;
  let srcSet: string | undefined;
  try {
    if (value.asset?._ref || value.asset?._id) {
      const image = urlFor(value).fit('max').auto('format');
      src = image.width(1440).url();
      srcSet = IMAGE_WIDTHS.map((width) => `${image.width(width).url()} ${width}w`).join(', ');
    } else {
      src = value.asset!.url!;
    }
  } catch {
    return null;
  }

  const dimensions = imageDimensions(value);
  return (
    <figure className="blog-content__figure">
      <img
        src={src}
        srcSet={srcSet}
        sizes={srcSet ? '(min-width: 1024px) 760px, 100vw' : undefined}
        alt={value.alt?.trim() ?? ''}
        width={dimensions?.width}
        height={dimensions?.height}
        loading="lazy"
        decoding="async"
      />
      {value.caption?.trim() && <figcaption>{value.caption.trim()}</figcaption>}
    </figure>
  );
};

const YouTubeBlock = ({ value }: { value: YouTubeValue }) => {
  const videoId = getYouTubeVideoId(value?.url);
  const title = value?.title?.trim();

  if (!videoId) {
    const href = normalizeHref(value?.url);
    return href ? (
      <p>
        <a href={href}>{title || 'Ver video en YouTube'}</a>
      </p>
    ) : null;
  }

  return (
    <figure className="blog-content__video">
      <div className="blog-content__video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title || 'Video de YouTube'}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      {title && <figcaption>{title}</figcaption>}
    </figure>
  );
};

const CodeBlock = ({ value }: { value: CodeValue }) => {
  const code = value?.code?.replace(/\n+$/, '') ?? '';
  if (!code.trim()) return null;
  const label = [value.filename, value.language].map((part) => part?.trim()).filter(Boolean).join(' · ');

  return (
    <figure className="blog-content__code">
      {label && <figcaption>{label}</figcaption>}
      <pre tabIndex={0} aria-label={label ? `Código: ${label}` : 'Bloque de código'}>
        <code>{code}</code>
      </pre>
    </figure>
  );
};

const TableBlock = ({ value }: { value: TableValue }) => {
  const captionId = React.useId();
  const rows = (Array.isArray(value?.rows) ? value.rows : [])
    .map((row) => (Array.isArray(row?.cells) ? row.cells.map((cell) => (typeof cell === 'string' ? cell : '')) : []))
    .filter((cells) => cells.some((cell) => cell.trim()));
  if (!rows.length) return null;

  const columns = Math.max(...rows.map((cells) => cells.length));
  const pad = (cells: string[]) => [...cells, ...Array<string>(columns - cells.length).fill('')];
  const hasHeader = value.hasHeader !== false && rows.length > 1;
  const [header, ...body] = hasHeader ? rows : [null, ...rows];
  const caption = value.caption?.trim();

  return (
    <figure className="blog-content__table">
      {caption && <figcaption id={captionId}>{caption}</figcaption>}
      <div className="blog-content__table-scroll" role="region" aria-label={caption || 'Tabla'} tabIndex={0}>
        <table aria-labelledby={caption ? captionId : undefined}>
          {header && (
            <thead>
              <tr>
                {pad(header).map((cell, index) => (
                  <th key={index} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {body.map((cells, rowIndex) => (
              <tr key={rowIndex}>
                {pad(cells ?? []).map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
};

const Heading = ({ level, value, children }: BlockProps & { level: HeadingLevel }) => {
  const Tag = level;
  return (
    <Tag id={value.anchorId} className={`blog-content__heading blog-content__${level}`}>
      {children}
    </Tag>
  );
};

const Paragraph = ({ value, children }: BlockProps) => (toPlainText(value).trim() ? <p>{children}</p> : null);

const Link = ({ value, children }: PortableTextMarkComponentProps) => {
  const href = normalizeHref((value as { href?: unknown } | undefined)?.href);
  return href ? <a href={href}>{children}</a> : <>{children}</>;
};

const heading = (level: HeadingLevel) => (props: BlockProps) => <Heading level={level} {...props} />;

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image: ImageBlock,
    youtube: YouTubeBlock,
    codeSnippet: CodeBlock,
    code: CodeBlock,
    contentTable: TableBlock,
    table: TableBlock,
    divider: () => <hr className="blog-content__divider" />,
  },
  block: {
    normal: Paragraph,
    h1: heading('h1'),
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    h5: heading('h5'),
    h6: heading('h6'),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: Link,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    underline: ({ children }) => <u>{children}</u>,
    'strike-through': ({ children }) => <s>{children}</s>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: ({ children }) => <li>{children}</li>,
  unknownType: () => null,
  unknownMark: ({ children }) => <>{children}</>,
  unknownBlockStyle: Paragraph,
  unknownList: ({ children }) => <ul>{children}</ul>,
  unknownListItem: ({ children }) => <li>{children}</li>,
};
