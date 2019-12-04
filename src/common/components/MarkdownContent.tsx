import React, { ReactNode } from 'react';
import Markdown from 'markdown-to-jsx';
import styled from 'styled-components';
const MarkdownContent: React.FC = ({ children }) => (
  <Container>
    <Markdown
      options={{
        forceBlock: true,
        overrides: {
          a: {
            component: CustomAnchorTag
          }
        }
      }}
    >{children}</Markdown>
  </Container>
);

export default MarkdownContent;

const Container = styled.div`
  p {
    line-height: 1.4;
  }

  a:link, a:visited {
    color: #1565C0; /* blue 800 */
  }

  a:hover, a:active, a:focus {
    color: #1976D2; /* blue 700 */
  }

  table {
    border: 1px solid #ccc;
    border-collapse: collapse;
  }

  th, td {
    border: 1px solid #ccc;
    text-align: left;
    padding: 0.25rem 0.5rem;
  }
`;

type CustomAnchorTagProps = {
  title: string
  href: string
  children: ReactNode
}

const CustomAnchorTag: React.SFC<{}> = (props) => {
  // TRICKY: The types would not agree any other way, so this hacks around the
  // problem with a cast.
  const { title, href, children } = (props as CustomAnchorTagProps);
  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
    >{children}</a>
  )
};
