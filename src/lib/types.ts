export type Project = {
  index: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  image: string;
  alt: string;
  span: string;
  content: string[];
};

export type JournalEntry = {
  n: string;
  d: string;
  t: string;
  tag: string;
  slug: string;
  content: string[];
  html?: string;
  readingTime?: string;
};

export type Service = {
  n: string;
  title: string;
  body: string;
  deliverables: string[];
};
