import { useBook } from "../../api/useBooks";
import { AppContainer } from "../../lib/AppContainer";
import { useParams } from "react-router-dom";

export const BookPage = () => {
  const { id } = useParams();

  const book = useBook(id);

  if (!id || book.status !== "success") {
    return <></>;
  }

  return (
    <AppContainer
      title={book.data.title}
      subtitle={book.data.author.join(", ")}
      breadcrumb={{ to: "/library", text: "Library" }}
    ></AppContainer>
  );
};
