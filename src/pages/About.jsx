import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Box, Flex, Heading, Text, UnorderedList, OrderedList, Link, ListItem } from '@chakra-ui/react';

import AboutCard from '../components/AboutCard';
import AboutMe from '../markdown/AboutMe.md';
import TableOfContents from '../components/TOC';

const About = () => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch(AboutMe)
      .then((response) => response.text())
      .then((text) => setMarkdown(text));
  }, []);

  const components = {
    ...ChakraUIRenderer(),
    h1: ({ children }) => <Heading as="h1" size="2xl">{children}</Heading>,
    h2: ({ children }) => <><Heading as="h2" size="xl" marginTop="1.5em">{children}</Heading><hr/></>,
    h3: ({ children }) => <Heading as="h3" size="lg" marginTop="1em">{children}</Heading>,
    h4: ({ children }) => <Heading as="h4" size="md" marginTop="1em" mb="0.5em">{children}</Heading>,
    ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
    ol: ({ children }) => <OrderedList>{children}</OrderedList>,
    li: ({ children, node }) => <ListItem ml={(node.position.start.column-1).toString() + "em"}>{children}</ListItem>,
    p: ({ children }) => <Text mt="3" mb="3">{children}</Text>,
    a: ({ children, node }) => <Link as="a" color="teal.500" href={node.properties.href} target="_blank" rel="noopener noreferrer">{children}</Link>,
  };
  
  return (
    <Flex direction={{ base: 'column', md: 'row' }}>
      <Box flex="1" m={10}>
        <AboutCard />
      </Box>
      <Box flex="3" mb={20} m={10} mr={0}>
        <Text as="div" textAlign="left">
          <ReactMarkdown components={components} children={markdown} skipHtml />
        </Text>
      </Box>
      <Box flex="1.25" m={10}>
        <TableOfContents headings={markdown.match(/(?<=^#{1,2} ).*$/gm)} />
      </Box>
    </Flex>
  );
};

export default About;