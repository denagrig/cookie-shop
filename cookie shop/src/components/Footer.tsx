import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@material-ui/icons"
  import styled from "styled-components"
  
  const Container = styled.div`
    display: flex;
  `
  
  const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
  `
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
  `
  
  const SocialContainer = styled.div`
    display: flex;
  `
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `
  
  const Center = styled.div`
    flex: 1;
    padding: 20px;
  `
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `
  
  const Right = styled.div`
    flex: 1;
    padding: 20px;
  `
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `
  
  const Payment = styled.img`
      width: 50%;
  `
  
  const Footer = () => {
    return (
      <Container>
        <Left>
          <Logo>COOKIE.</Logo>
          <Desc>
            Some random text some random text some random text some random text 
            Some random text some random text some random text some random text 
            Some random text some random text some random text some random text 
          </Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>

        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 123 Random Street , Random City 12345
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> +1 234 56 78
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> contact@gmail.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
        </Right>
      </Container>
    )
  }
  
  export default Footer