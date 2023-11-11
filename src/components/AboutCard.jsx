import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Flex, Heading, Icon, Tooltip, VStack } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaEnvelope, FaLinkedin } from 'react-icons/fa';

import { Logo } from './logo/Logo'

class AboutCard extends Component {
  constructor(props) {
    super(props);
    this.cardHeaderRef = React.createRef();
    this.state = {
      logoHeight: 'md',
    }
  }

  componentDidMount() {
    if (this.cardHeaderRef.current) {
      const width = this.cardHeaderRef.current.offsetWidth;
      this.setState({ logoHeight: `${Math.floor(0.75 * width)}px` });
    }
  }

  render () {
    return (
      <Card ml={5}>
        <CardHeader ref={this.cardHeaderRef} mt={5}>
          <Flex justifyContent='center'>
            <Logo useanimation="false" h={this.state.logoHeight} />
          </Flex>
        </CardHeader>
        <CardFooter>
          <Tooltip label="Would you trust me so easily?" openDelay={2000}>
            <Heading as='h2' size='lg' ml={3}>Amit Ho</Heading>
          </Tooltip>
        </CardFooter>
        <CardBody>
          <VStack spacing={2} alignItems="start" ml={3}>
            <Button leftIcon={<Icon as={FaMapMarkerAlt} />} variant="link" size="sm">Hong Kong</Button>
            <Button as="a" href="mailto:teinc3@gmail.com" leftIcon={<Icon as={FaEnvelope} />} variant="link" size="sm">Email</Button>
            <Button as="a" href="https://www.youtube.com/watch?v=6TKEHyyaMqM" leftIcon={<Icon as={FaLinkedin} />} variant="link" size="sm">LinkedIn</Button>
          </VStack>
        </CardBody>
      </Card>
    )
  }
}

export default AboutCard;

