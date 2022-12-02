import React from "react";
import { styled } from "@mui/material";
// import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
// import background from './src/Home/Bg_img.png'
const Home = () => {
  return (
    <StyleDiv
      style={{
        background: `url('/images/Bg_img.png')`,
        height: "100vh",
        backgroundSize: "100% 100%" /*, backgroundSize: 'cover'*/,
      }}
    >
      <p className="header">
        <a href="/">Spotlight</a>
      </p>
      <p className="body">
        Your
        <br />
        Favourite Brands
        <br /> Near You
      </p>
      {/* <p className='anchor'><a href={encodeURI("/Spicestory")}>Gladful</a></p> */}
      <p className="anchor">
        <a href={encodeURI("/Gladful")}>Gladful</a>
      </p>
    </StyleDiv>
  );
};

const StyleDiv = styled("div")`
  ${"" /* padding-bottom: 50%; */}

  .header {
    margin-top: 0;
    padding: 15px 20px;

    line-height: 30px;
    background-color: black;
    width: auto;

    a {
      text-decoration: none;
      color: #fff;
      font-weight: 600;
      font-size: 18px;
    }
  }

  .body {
    text-align: left;
    margin-top: 33vh;
    margin-left: 4vw;
    padding: 10px 20px;
    font-style: normal;
    font-weight: 600;
    font-size: 2.4rem;
    line-height: 2.8rem;
    text-transform: capitalize;
    ${"" /* background: linear-gradient(90deg, #B89FFF 0%, #FF9BC1 100%); */}
    background: white;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .anchor {
    text-align: center;
    a {
      text-decoration: none;
      color: #fff;
    }
  }
`;

export default Home;
