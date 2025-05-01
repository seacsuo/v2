export type Merch = {
  id: number;
  name: string;
  description: string;
  imageLink?: string;
  link?: string;
};

export type Event = {
  id: number;
  title: string;
  description: string;
  datetime: string; // ISO-8601 timestamp with offset
  location: string;
  link?: string;
  imageLink?: string;
};
