import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

import NavbarComponent from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import LoadingScreen from "../../../components/LoadingScreen";

import { useReflection } from "../../../hooks/useReflection";
import ReflectionTable from "./ReflectionTable";
import ReflectionCreateTable from "./ReflectionCreateTable";

function Reflection() {
  const { chatId } = useParams();

  const {
    loading,
    book,
    reflection,
    createReflection,
    createFinalReport
  } = useReflection(chatId);

  if (loading) {
    return (
      <Container maxWidth={false} 
      style={{ 
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: 0,
        overflow: "hidden", }}>
        <NavbarComponent />
        <LoadingScreen />
        <Footer />
      </Container>
    );
  }

  const isCreateMode = !reflection;

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        height: "auto",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <NavbarComponent />

      {isCreateMode ? (
        <ReflectionCreateTable book={book} createReflection={createReflection} />
      ) : (
        <ReflectionTable
          book={book}
          reflection={reflection}
          createFinalReport={createFinalReport}
        />
      )}

      <Footer />
    </Container>
  );
}

export default Reflection;
