export interface IMemberSchema {
  code: string;
  name: string;
  books?: Array<{
    code: string;
    title: string;
    author: string;
    penalty_date: Date | null;
  }>;
}
