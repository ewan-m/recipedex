import { Link } from "react-router-dom";
import { AppContainer } from "../lib/AppContainer";
import { LibraryBooks } from "./LibraryBooks";
import { useUserLibrary } from "../api/useUserLibrary";

export const LibraryPage = () => {
  const { userBooks } = useUserLibrary();

  return (
    <AppContainer title={"Library"}>
      {userBooks.status === "success" && (
        <LibraryBooks books={userBooks.data} />
      )}
      <div className="h-20 w-full"></div>
      <Link
        to="/manage"
        className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center bg-white p-4 text-lg font-semibold shadow-lg"
      >
        Add more books
      </Link>
    </AppContainer>
  );
};
