import { useAutoAnimate } from "@formkit/auto-animate/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { Book } from "../api/useBooks";

export const LibraryBooks: FunctionComponent<{
  books: Book[];
}> = ({ books }) => {
  const [animated] = useAutoAnimate();

  return (
    <section
      ref={animated}
      className="grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4"
    >
      {books.map((book) => (
        <Link
          className="rounded-lg bg-gray-900 shadow-lg"
          key={`${book.title} ${book.author.join(",")} ${book.isbn}`}
          to={`/library/${book.isbn}`}
        >
          <div className="flex items-center p-3">
            <div className="flex h-44 w-32 shrink-0 items-center justify-center">
              <img
                className="block h-full w-auto rounded object-contain"
                src={book.imageUrl}
                alt=""
              />
            </div>
            <div className="flex h-full flex-col items-start p-5">
              <h3 className="line-clamp-3 text-left text-lg text-white">
                {book.title}
              </h3>
              <p className="line-clamp-2 text-left text-gray-400">
                {book.author.join(", ")}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};
