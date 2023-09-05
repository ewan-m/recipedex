import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { queryKey } from "./queryKey";

export type GoogleBookResponse = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    industryIdentifiers: { type: "ISBN_13"; identifier: string }[];
    imageLinks: { thumbnail: string; large?: string };
  };
};

export type ErrorResponse = { error: { status: "UNAUTHENTICATED" } };

export type GoogleBooksResponse = {
  items?: GoogleBookResponse[];
  totalItems: number;
};

export type Book = {
  author: string[];
  title: string;
  isbn: string;
  volumeId: string;
  imageUrl: string;
};

export const useBook = (volumeId: string | undefined): UseQueryResult<Book> => {
  return useQuery(
    [queryKey.book, volumeId],
    async () => {
      const url = `https://www.googleapis.com/books/v1/volumes/${volumeId}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const item = (await res.json()) as GoogleBookResponse;

      return {
        author: item.volumeInfo?.authors ?? [],
        title: item.volumeInfo.title,
        isbn:
          item.volumeInfo.industryIdentifiers?.find(
            (id) => id.type === "ISBN_13",
          )?.identifier ?? "",
        imageUrl:
          item.volumeInfo.imageLinks?.large ??
          item.volumeInfo.imageLinks?.thumbnail ??
          "",
        volumeId: item.id,
      };
    },
    { enabled: volumeId !== undefined },
  );
};

export const useBooks = (query: string | null): UseQueryResult<Book[]> => {
  return useQuery([queryKey.books, query], async () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${
      query && query.length > 2 ? query : "italian cooking"
    }&maxResults=15`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const json = (await res.json()) as GoogleBooksResponse;

    return (json.items ?? [])
      .map((item) => ({
        author: item.volumeInfo?.authors ?? [],
        title: item.volumeInfo.title,
        isbn:
          item.volumeInfo.industryIdentifiers?.find(
            (id) => id.type === "ISBN_13",
          )?.identifier ?? "",
        imageUrl: item.volumeInfo.imageLinks?.thumbnail ?? "",
        volumeId: item.id,
      }))
      .filter((book) => book.isbn !== "")
      .slice(0, 12);
  });
};
