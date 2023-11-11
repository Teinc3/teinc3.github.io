import { Box, Link, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const TableOfContents = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState('');

  useEffect(() => {
    if (!headings) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px', threshold: 0 }
    );

    headings.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      headings.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  return (
    <Box>
      <VStack align="start" spacing={2}>
        {headings && headings.map((heading) => (
          <Link
            href={`#${heading}`}
            key={heading}
            color={heading === activeHeading ? 'blue.500' : 'gray.500'}
          >
            {heading}
          </Link>
        ))}
      </VStack>
    </Box>
  );
};

export default TableOfContents;