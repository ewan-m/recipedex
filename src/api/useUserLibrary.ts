import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../lib/useAuth";
import { queryKey } from "./queryKey";
import { ErrorResponse, GoogleBooksResponse } from "./useBooks";

export const useUserLibrary = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  const baseUrl = "https://www.googleapis.com/books/v1/mylibrary/bookshelves/4";

  const userBooks = useQuery([queryKey.userBooks], async () => {
    if (auth.isLoggedIn) {
      const res = await fetch(
        `${baseUrl}/volumes?access_token=${auth.accessToken}&maxResults=50`,
      );

      const json = (await res.json()) as ErrorResponse | GoogleBooksResponse;

      if ("error" in json) {
        auth.logout();
        return [];
      }

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
        .sort((a, b) =>
          `${a.author.join(",")} ${a.title}`.localeCompare(
            `${b.author.join(",")} ${b.title}`,
          ),
        );
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
