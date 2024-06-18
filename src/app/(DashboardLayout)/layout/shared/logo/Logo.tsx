import Link from "next/link";
import { Typography, styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      {/* <Image src="/images/logos/dark-logo.svg" alt="logo" height={70} width={174} priority /> */}
      <Typography>TOPSIS</Typography>
    </LinkStyled>
  );
};

export default Logo;
