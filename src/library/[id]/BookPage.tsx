import { AppContainer } from "../../lib/AppContainer";
import { useParams } from "react-router-dom";

export const BookPage = () => {
  const { id } = useParams();

  if (!id) {
    return <></>;
  }

  return (
    <AppContainer
      title={"title"}
      subtitle={"author"}
      breadcrumb={{ to: "/library", text: "Library" }}
    ></AppContainer>
  );
};
