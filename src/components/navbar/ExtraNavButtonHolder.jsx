import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Stack,
  Flex,
} from '@chakra-ui/react'

import { BsThreeDotsVertical } from 'react-icons/bs';

export default function ExtraNavButtonHolder(props) {
  const {children} = props;
  return (
    /**
     * You may move the Popover outside Flex.
     */
    <Flex justifyContent="center">
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="Navigation Options"
            icon={<BsThreeDotsVertical />}
            variant="solid"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              {children}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}
