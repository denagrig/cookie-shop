import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons"

import * as styled from "./Footer.styled"

const Footer = () => {
  return (
    <styled.Container>
      <styled.Left>
        <styled.Logo>COOKIE</styled.Logo>
        <styled.Desc>
          Some random text some random text some random text some random text
          Some random text some random text some random text some random text
          Some random text some random text some random text some random text
        </styled.Desc>
        <styled.SocialContainer>
          <styled.SocialIcon color="3B5999">
            <Facebook />
          </styled.SocialIcon>
          <styled.SocialIcon color="E4405F">
            <Instagram />
          </styled.SocialIcon>
          <styled.SocialIcon color="55ACEE">
            <Twitter />
          </styled.SocialIcon>
          <styled.SocialIcon color="E60023">
            <Pinterest />
          </styled.SocialIcon>
        </styled.SocialContainer>
      </styled.Left>
      <styled.Center />
      <styled.Right>
        <styled.Title>Contact</styled.Title>
        <styled.ContactItem>
          <Room style={{ marginRight: "10px" }} /> 123 Random Street , Random
          City 12345
        </styled.ContactItem>
        <styled.ContactItem>
          <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
        </styled.ContactItem>
        <styled.ContactItem>
          <MailOutline style={{ marginRight: "10px" }} /> contact@gmail.com
        </styled.ContactItem>
        <styled.Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </styled.Right>
    </styled.Container>
  )
}

export default Footer
