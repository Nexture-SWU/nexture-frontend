import { Container, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import NavbarComponent from '../../components/Navbar'
import MainContainer from '../../components/MainContainer';
import { PATH } from "../../config/paths";
import Footer from '../../components/Footer';

import { articleList } from "../../data/articleData";

const ReportMain = () => {
  const navigate = useNavigate();

  const handleCardClick = (articleId) => {
    navigate(`${PATH.ARTICLE}/${articleId}`);
  };

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: "var(--background-color)",
        minHeight: "100vh",
        padding: "0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <NavbarComponent />

      <MainContainer>
        <Typography
          variant="h1"
          fontWeight={700}
          fontSize="28px"
          marginBottom="16px"
        >
          자료 게시판
        </Typography>

        <Grid container spacing={2}>
          {articleList.map((article) => (
            <Grid item xs={12} sm={6} md={3} key={article.id}>
              <Card variant="outlined"
                onClick={() => handleCardClick(article.id)}
                sx={{ 
                  cursor: "pointer",
                  borderRadius: 2,
                  padding: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": { transform: "translateY(-4px)", transition: "0.2s", border: "solid 1px var(--color-blue-500)" }
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={article.thumbnail}
                  alt={article.title}
                  sx={{ borderRadius: 1, mb: 2 }}
                />
                <CardContent sx={{ padding: 0, "&:last-child": { pb: 0 } }}>
                  <Typography variant="h6" fontWeight={700} fontSize="20px" lineHeight="30px"
                    sx={{ mb: "4px" }}>
                    {article.title}
                  </Typography>
                  <Typography variant="body2" fontWeight={400} fontSize="16px" lineHeight="24px" color="var(--color-gray-500)">
                    {article.summary}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MainContainer>

      {/* <Container maxWidth="lg" style={{ marginTop: "120px", marginBottom: "60px" }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          아티클 리스트
        </Typography>


      </Container> */}

      <Footer />
    </Container>
  );
};

export default ReportMain;
