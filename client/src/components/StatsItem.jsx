import styled, { StyleSheetManager } from 'styled-components';

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--bcgColor2);
  border-radius: var(--borderRadius);
  border-bottom: 5px solid ${(props) => props.color};
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .count {
    display: block;
    font-weight: 700;
    font-size: 50px;
    color: ${(props) => props.color};
  }
  h5 {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
    font-weight: bolder;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
      color: ${(props) => props.color};
    }
  }
`;

const StatsItem = ({ count, title, icon, color, bcg }) => {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => prop === 'bck' || 'color'}>
      <Wrapper color={color} bcg={bcg}>
        <header>
          <span className='count'>{count}</span>
          <span className='icon'>{icon}</span>
        </header>
        <h5>{title}</h5>
      </Wrapper>
    </StyleSheetManager>
  );
};

export default StatsItem;
