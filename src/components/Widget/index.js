import styled from 'styled-components';

const Widget = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid ${({ theme }) => theme.colors.baby_blue};
  background-color: ${({ theme }) => theme.colors.transparent};
  border-radius: 4px;
  overflow: hidden;
  h1, h2, h3 {
    font-size: 16px;
    font-weight: 700;
    line-height: 1; 
    margin-bottom: 0;
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
  }
`;

Widget.Header = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 18px 32px;
  
  background-color: ${({ theme }) => theme.colors.baby_blue};
  
  * {
    margin: 0;
  }
`;

Widget.HeaderDesc = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  
  background-color: ${({ theme }) => theme.colors.mainBg};
  
  * {
    margin: 0;
  }
`;

Widget.Content = styled.div`
  padding: 24px 32px 32px 32px;
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
`;

Widget.Topic = styled.a`
  outline: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.contrastText};
  color: ${(prop) => (prop.isDisabled ? ({ theme }) => `${theme.colors.contrastText}70` : ({ theme }) => `${theme.colors.contrastText}`)};
  background-color: ${({ theme }) => `${theme.colors.transparent}`};

  padding: 10px 15px;
  margin-bottom: 8px;
  cursor: ${(prop) => (prop.isDisabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: .3s;
  display: block;
    
  &:hover,
  &:focus {
    opacity: .5;
    transform: translatex(10px);
  }  

  
`;

export default Widget;
