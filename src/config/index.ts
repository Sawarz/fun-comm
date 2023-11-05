const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://fun-comm-lbprs1a7w-sawarz.vercel.app/';