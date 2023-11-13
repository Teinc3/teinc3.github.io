import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import AboutCard from '../components/AboutCard';
import AboutMe from '../markdown/AboutMe.md';
import TableOfContents from '../components/TOC';
import MarkdownParser from '../components/MarkdownParser';

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(AboutMe)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);
  
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Box flex="1" m={10}>
        <AboutCard />
      </Box>
      <Box flex="3" mb={20} m={10} mr={0}>
        <MarkdownParser markdown={markdown} />
      </Box>
      <Box flex="1.25" m={10}>
        <TableOfContents headings={markdown.match(/(?<=^#{1,2} ).*$/gm)} />
      </Box>
    </Flex>
  );
};

export default About;