import { Search } from "./Search";
import { AppContainer } from "../lib/AppContainer";
import { useBooks } from "../api/useBooks";
import { useSearchParams } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useUserLibrary } from "../api/useUserLibrary";
import { ManageBook } from "./Book";
import { AddedBooks } from "./AddedBooks";

export const ManagePage = () => {
  const [searchParams] = useSearchParams();
  const books = useBooks(searchParams.get("query"));
  const { userBooks } = useUserLibrary();

  const [animated] = useAutoAnimate();

  return (
    <AppContainer
      title={"Find your books"}
      breadcrumb={{ text: "Library", to: "/library" }}
    >
      <Search />
      <section
        ref={animated}
        className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4"
      >
        {userBooks.isSuccess &&
          books.isSuccess &&
          books.data.map((book) => (
            <ManageBook
              key={`${book.title} ${book.author.join(",")} ${book.isbn}`}
              book={book}
            />
          ))}
      </section>
      {userBooks.isSuccess && (
        <AddedBooks bookshelf={userBooks.data.map((book) => book.volumeId)} />
      )}
    </AppContainer>
  );
};
