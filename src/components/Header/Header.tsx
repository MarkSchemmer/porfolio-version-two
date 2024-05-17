import { Menu, MenuButton, IconButton, MenuList, MenuItem, Flex, Box, HStack, Text, useMediaQuery} from "@chakra-ui/react";
import { HamburgerIcon, ExternalLinkIcon, AddIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons'
import React, { useEffect, useState } from "react";


let menuItemList = [
  "Home", "About", "Game Apps", "Contact"
];

const DropDownMenu = () => {
  return (
    <Flex bg="teal.500" maxHeight={"100px"} padding="1.5rem" className="dropdown">
      <Menu>
      <MenuButton
        bg={"blue.200"}
        maxWidth={"50px"}
        p={"1px"}
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
      />
  <MenuList>
    { menuItemList.map(i => <MenuItem>{i}</MenuItem>)}
  </MenuList>
  </Menu>
  </Flex>
  )
}

const StackMenu = () => {
  return (
    <>
    <Flex as="nav" padding="1rem" bg="teal.500" color={"white"} alignItems="center" className="bg-nav">
      <Flex p={"5px"} maxWidth="100px" justifyContent="flex-start">
        <Box>
          Saku Hasu
        </Box>
      </Flex>
        <HStack spacing="10px" as="nav" marginLeft="auto">
              {(menuItemList.map(i =>     
                  <Box p="5px" w='100px' h='60px' pt={"15px"}>
                    <Text fontSize={"md"}>{(i)}</Text>
                  </Box>
              ))}
        </HStack>
        </Flex>
    </>
  )
}

export default function Header() {
  const [isSmallerThan700] = useMediaQuery('(max-width: 600px)');
  // State to toggle component visibility
  // const [isVisible, setIsVisible] = useState(true);
  return (
        <Flex  direction={"column"}>
           {isSmallerThan700 ? <DropDownMenu /> : <StackMenu />}       
        </Flex>
  );
}
