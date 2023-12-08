type FetchBooks = {
  title: string | null | undefined;
  searchTerm: string | null;
  page?: string | null;
};
type GetPageFromUrl = { url: string };
type GetPageFromUrlResponse = string | null;
