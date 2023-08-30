import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../lib/useAuth";
import { queryKey } from "./queryKey";
import { GoogleBooksResponse } from "./useBooks";

export const useUserLibrary = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const baseUrl = "https://www.googleapis.com/books/v1/mylibrary/bookshelves/4";

  const userBooks = useQuery([queryKey.userBooks], async () => {
    if (auth.isLoggedIn) {
      const res = await fetch(
        `${baseUrl}/volumes?access_token=${auth.accessToken}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const json = (await res.json()) as GoogleBooksResponse;

      return (json.items ?? []).map((item) => ({
        author: item.volumeInfo?.authors ?? [],
        title: item.volumeInfo.title,
        isbn:
          item.volumeInfo.industryIdentifiers?.find(
            (id) => id.type === "ISBN_13",
          )?.identifier ?? "",
        imageUrl: item.volumeInfo.imageLinks?.thumbnail ?? "",
        volumeId: item.id,
      }));
    }
    return [];
  });

  const toggleBookMutation = useMutation(async (args: { volumeId: string }) => {
    if (auth.isLoggedIn && userBooks.status === "success") {
      const res = await fetch(
        `${baseUrl}/${
          userBooks.data.some((book) => book.volumeId === args.volumeId)
            ? "removeVolume"
            : "addVolume"
        }?volumeId=${args.volumeId}&access_token=${auth.accessToken}`,
        { method: "POST" },
      );

      if (!res.ok) {
        throw new Error("Failed to post data");
      }

      queryClient.invalidateQueries({ queryKey: [queryKey.userBooks] });
    }
  });

  return {
    userBooks: userBooks,
    toggleBookMutation: toggleBookMutation,
  } as const;
};
