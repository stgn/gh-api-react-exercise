import styled from 'styled-components';

const BaseButton = styled.button`
  border: 0;
  padding: 0;
  line-height: normal;
  font: inherit;
  background: transparent;
  cursor: pointer;
`;

export const Button = styled(BaseButton)`
  background: var(--theme-dark);
  color: white;
  padding: 0.75rem 3rem;
  border-radius: 0.25rem;
  font-weight: bold;
`;

export const LinkButton = styled(BaseButton)`
  color: var(--theme-dark);
  text-decoration: underline;
`;

export const TextInput = styled.input.attrs({
  type: 'text'
})`
  padding: 0.75rem 1rem;
  border-radius: 0.25rem;
  border: 1px solid black;
  font: inherit;
`;
