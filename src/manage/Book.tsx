import { FC, useState } from "react";
import { Book } from "../api/useBooks";
import { useUserLibrary } from "../api/useUserLibrary";
import Add from "@mui/icons-material/Add";
import Check from "@mui/icons-material/Check";
import { LoadingSpinner } from "../lib/LoadingSpinner";

export const ManageBook: FC<{ book: Book }> = ({ book }) => {
  const { userBooks, toggleBookMutation } = useUserLibrary();

  const [hasBook, setHasBook] = useState<null | boolean>(null);

  if (
    userBooks.data?.some((userBook) => userBook.volumeId === book.volumeId) &&
    hasBook === null
  ) {
    setHasBook(true);
  }

  return (
    <button
      className="group relative  rounded-lg bg-gray-900 shadow-lg"
      onClick={(e) => {
        e.preventDefault();
        if (userBooks.status === "success") {
          toggleBookMutation
            .mutateAsync({ volumeId: book.volumeId })
            .then(() => {
              setHasBook((has) => !has);
            });
        }
      }}
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

      {toggleBookMutation.status === "loading" ? (
        <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-lg bg-black bg-opacity-60 transition">
          <span className="rounded-lg p-2 font-medium text-white backdrop-blur">
            <LoadingSpinner />
          </span>
        </div>
      ) : (
        <>
          {userBooks.status === "success" && (
            <>
              {hasBook ? (
                <div className="absolute top-0 flex h-full w-full items-center justify-evenly rounded-lg bg-emerald-400 bg-opacity-60 opacity-100 transition">
                  <span className="rounded-lg p-2 font-medium text-white backdrop-blur">
                    <Check /> Added
                  </span>
                </div>
              ) : (
                <div className="absolute top-0 flex h-full w-full items-center justify-evenly rounded-lg bg-black bg-opacity-0 transition group-hover:bg-opacity-60 group-hover:opacity-100">
                  <span className="h-8 w-8 translate-y-3 transform rounded-full bg-white text-xl text-black opacity-0 transition hover:scale-110 group-hover:translate-y-0 group-hover:opacity-100">
                    <Add />
                  </span>
                </div>
              )}
            </>
          )}
        </>
      )}
    </button>
  );
};
