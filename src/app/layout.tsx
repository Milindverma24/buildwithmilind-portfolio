import type { Metadata, Viewport } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const BASE_URL = 'https://milindverma24.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Milind Verma | Full Stack Engineer & Web Developer',
    template: '%s | Milind Verma',
  },

  description:
    'Milind Verma (its_milind) — Full Stack Engineer with expertise in Next.js, React, Node.js, Python, and Machine Learning. Available for hire.',

  keywords: [
    // Brand / name
    'Milind Verma',
    'its_milind',
    'Milindverma24',
    // Role
    'Full Stack Engineer',
    'Full Stack Developer',
    'Software Engineer',
    'Web Developer',
    'Frontend Developer',
    'Backend Engineer',
    'React Developer',
    'Next.js Developer',
    'Next.js Expert',
    'Django Developer',
    'Go Developer',
    'Golang Developer',
    'TypeScript Developer',
    'Node.js Developer',
    'Python Developer',
    // Hire intent
    'hire full stack developer',
    'hire Next.js developer',
    'hire React developer',
    'hire software engineer',
    'hire web developer',
    'freelance full stack developer',
    'freelance software engineer',
    'freelance web developer',
    'remote software engineer for hire',
    'contract developer',
    'available for hire',
    // Tech stack
    'Next.js',
    'React',
    'Django',
    'Go',
    'PostgreSQL',
    'Redis',
    'AWS',
    'Docker',
    'TypeScript',
    'Node.js',
    'REST API development',
    'GraphQL',
    'Microservices',
    'CI/CD',
    'cloud engineer',
    // Portfolio / reach
    'Full Stack Developer portfolio',
    'Software Engineer portfolio',
    'Web Developer portfolio',
    'Nigerian software engineer',
    'African developer',
    'remote developer worldwide',
    'enterprise web development',
    'scalable web applications',
    'production-grade web systems',
    'high-performance web apps',
  ],

  authors: [{ name: 'Milind Verma', url: BASE_URL }],
  creator: 'Milind Verma',
  publisher: 'Milind Verma',

  icons: {
    icon: [{ url: '/logo/MILIND VERMA.png', type: 'image/png' }],
    apple: '/logo/MILIND VERMA.png',
    shortcut: '/logo/MILIND VERMA.png',
  },

  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'BuildWithMilind',
    title: 'Milind Verma | Full Stack Engineer & Web Developer',
    description:
      'Building high-performance web systems and ML applications. React · Node.js · Next.js · Python. Available for hire.',
    locale: 'en_US',
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: 'Milind Verma — Full Stack Engineer & Web Developer',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@its_milind',
    creator: '@its_milind',
    title: 'Milind Verma | Full Stack Engineer & Web Developer',
    description:
      'Building production-grade web systems and ML models. React · Next.js · Node.js · Python. Available for hire.',
    images: [`${BASE_URL}/opengraph-image`],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      'en-US': BASE_URL,
      'en-GB': BASE_URL,
    },
  },

  category: 'technology',

  appleWebApp: {
    capable: true,
    title: 'Milind Verma',
    statusBarStyle: 'black-translucent',
  },

  other: {
    'theme-color': '#0A0A0A',
    'msapplication-TileColor': '#0A0A0A',
    'application-name': 'Milind Verma',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A0A0A',
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Milind Verma',
  alternateName: ['its_milind', 'Milindverma24'],
  url: BASE_URL,
  image: {
    '@type': 'ImageObject',
    url: `${BASE_URL}/opengraph-image`,
    width: 1200,
    height: 630,
  },
  jobTitle: 'Full Stack Engineer',
  description:
    'Full Stack Engineer building scalable web and ML applications using React, Node.js, Python, and AWS.',
  email: 'anshverma24112005@gmail.com',
  nationality: { '@type': 'Country', name: 'India' },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full Stack Engineer',
    description:
      'Designs, develops, and deploys scalable full-stack web applications for clients worldwide.',
    occupationLocation: { '@type': 'Country', name: 'Worldwide' },
    skills:
      'Java, Python, C++, JavaScript, React.js, Node.js, TensorFlow, OpenCV, SQL, AWS, Docker',
  },
  knowsAbout: [
    'Next.js', 'React', 'TypeScript', 'JavaScript',
    'Django', 'Python', 'Go', 'Node.js',
    'PostgreSQL', 'Redis', 'MongoDB',
    'AWS', 'Docker', 'Kubernetes',
    'REST APIs', 'GraphQL', 'Microservices',
    'CI/CD', 'DevOps', 'Cloud Architecture',
    'Web Performance Optimisation', 'System Design',
  ],
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Full Stack Web Development',
        description:
          'End-to-end web application development — from architecture to deployment.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'API Design & Integration',
        description:
          'RESTful and GraphQL API design, development, and third-party integrations.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Cloud Architecture & DevOps',
        description:
          'AWS cloud infrastructure, CI/CD pipelines, Docker containerisation, and deployment automation.',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Frontend Engineering',
        description:
          'High-performance React and Next.js frontends with advanced animations and polished UX.',
      },
    },
  ],
  sameAs: [
    'https://github.com/Milindverma24',
    'https://www.linkedin.com/in/milind-verma-8aa10a308/',
    'https://www.instagram.com/_itsmilindd/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'anshverma24112005@gmail.com',
    contactType: 'professional inquiry',
    availableLanguage: 'English',
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${BASE_URL}/#website`,
  url: BASE_URL,
  name: 'BuildWithMilind',
  description:
    'Portfolio and professional profile of Milind Verma — Full Stack Engineer.',
  author: { '@id': `${BASE_URL}/#person` },
  publisher: { '@id': `${BASE_URL}/#person` },
  inLanguage: 'en-US',
  copyrightYear: new Date().getFullYear(),
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${BASE_URL}/#profilepage`,
  url: BASE_URL,
  name: 'BuildWithMilind — Full Stack Engineer Portfolio',
  description:
    'Professional portfolio of Milind Verma (its_milind), a Full Stack Engineer building production-grade web systems.',
  dateCreated: '2024-01-01',
  dateModified: new Date().toISOString().split('T')[0],
  mainEntity: { '@id': `${BASE_URL}/#person` },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={instrumentSerif.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
