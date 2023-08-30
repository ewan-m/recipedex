import { FunctionComponent, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Link } from "react-router-dom";

export const AddedBooks: FunctionComponent<{ bookshelf: string[] }> = ({
  bookshelf,
}) => {
  const [initialBooks] = useState(bookshelf);
  const [animated] = useAutoAnimate();

  let numberRemoved = 0;
  let numberAdded = 0;

  initialBooks.forEach((book) => {
    if (!bookshelf.includes(book)) {
      numberRemoved++;
    }
  });
  bookshelf.forEach((book) => {
    if (!initialBooks.includes(book)) {
      numberAdded++;
    }
  });

  return (
    <div ref={animated}>
      <div className="h-20 w-full"></div>
      {(numberAdded !== 0 || numberRemoved !== 0) && (
        <Link
          to="/library"
          className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center bg-white p-4 text-lg font-semibold shadow-lg"
        >
          {numberAdded > 0 && `${numberAdded} added to`}
          {numberAdded > 0 && numberRemoved > 0 && ", "}
          {numberRemoved > 0 && `${numberRemoved} removed from`}
          {" library"}
        </Link>
      )}
    </div>
  );
};
