import React from 'react';
import { urlFor } from '../lib/sanity';

// Función para extraer el ID del video de YouTube
const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Componente para manejar embeds de YouTube
const YouTubeComponent = ({ value }: { value: any }) => {
  if (!value?.url) {
    return null;
  }

  const videoId = getYouTubeVideoId(value.url);
  
  if (!videoId) {
    return (
      <div className="my-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
        <p className="text-red-400">URL de YouTube inválida: {value.url}</p>
      </div>
    );
  }

  return (
    <figure className="my-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={value.title || 'Video de YouTube'}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {value.title && (
        <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
          {value.title}
        </figcaption>
      )}
    </figure>
  );
};

// Componente para manejar imágenes en PortableText
const ImageComponent = ({ value }: { value: any }) => {
  if (!value?.asset?._ref) {
    return null;
  }

  return (
    <figure className="my-8">
      <img
        src={urlFor(value).width(800).height(600).fit('max').auto('format').url()}
        alt={value.alt || ''}
        className="w-full h-auto rounded-lg shadow-lg"
        loading="lazy"
      />
      {value.caption && (
        <figcaption className="text-center text-sm text-gray-400 mt-2 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
};

// Componente para manejar bloques de código
const CodeComponent = ({ value }: { value: any }) => {
  return (
    <pre className="bg-dark-800 p-4 rounded-lg overflow-x-auto my-6">
      <code className="text-sm text-gray-300">
        {value.code}
      </code>
    </pre>
  );
};

// Componente para manejar citas
const BlockquoteComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-gray-300">
      {children}
    </blockquote>
  );
};

// Configuración de componentes para PortableText
export const portableTextComponents = {
  types: {
    image: ImageComponent,
    code: CodeComponent,
    youtube: YouTubeComponent,
  },
  block: {
    blockquote: BlockquoteComponent,
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-white">{children}</h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-white">{children}</h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-bold mt-6 mb-3 text-white">{children}</h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-gray-300">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: any }) => (
      <a
        href={value.href}
        className="text-primary hover:text-primary-light transition-colors underline"
        target={value.blank ? '_blank' : undefined}
        rel={value.blank ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-white">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
  list: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children: React.ReactNode }) => (
      <li className="text-gray-300">{children}</li>
    ),
    number: ({ children }: { children: React.ReactNode }) => (
      <li className="text-gray-300">{children}</li>
    ),
  },
};