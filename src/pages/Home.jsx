import { VStack, Text, Link, Code } from "@chakra-ui/react"

const Home = () => {
  return (
    <VStack spacing={8}>
      <Text>
        Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
      </Text>
      <Link
        color="teal.500"
        href="https://chakra-ui.com"
        fontSize="2xl"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Chakra
      </Link>
    </VStack>
  )
}

export default Home