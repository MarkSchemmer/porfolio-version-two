import { Menu, MenuButton, IconButton, MenuList, MenuItem, Flex, Box, HStack, Text, useMediaQuery} from "@chakra-ui/react";
import { HamburgerIcon } from '@chakra-ui/icons'
import React from "react";
import { useNavigate } from 'react-router-dom';

let menuItemList = [
  {display: "Home", path: "/"}, 
  {display: "About", path: "about"}, 
  {display: "Game Apps", path: "apps"}, 
  {display: "LeetCode", path: "leet"}, 
  {display: "Contact", path: "contact"},
  {display: "Chess App", path: "chess"}
];

const DropDownMenu = () => {
  const navigate = useNavigate();
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
    {menuItemList.map(i => <MenuItem onClick={() => navigate(i.path) }>{i.display}</MenuItem>)}
  </MenuList>
  </Menu>
  </Flex>
  )
}

const StackMenu = () => {
  const navigate = useNavigate();
  return (
    <>
    <Flex as="nav" padding="1rem" bg="teal.500" color={"white"} alignItems="center" className="bg-nav">
      <Flex maxWidth="100px" justifyContent="flex-start">
        <Box 
        onClick={() => navigate("/") } 
        sx={{
              '&:hover': {
                cursor: 'pointer',
              }
          }}>
          Saku Hasu
        </Box>
      </Flex>
        <HStack as="nav" marginLeft="auto">
              {(menuItemList.map(i =>     
                  <Box 
                  sx={{
                      '&:hover': {
                        cursor: 'pointer',
                      }
                  }}
                  onClick={() => navigate(i.path) } 
                  maxWidth='100px'
                  pr="15px"
                  h='60px' pt={"15px"}>
                    <Text fontSize={"md"}>{(i.display)}</Text>
                  </Box>
              ))}
        </HStack>
        </Flex>
    </>
  )
}

export default function Header() {
  const [isSmallerThan700] = useMediaQuery('(max-width: 600px)');
  return (
        <Flex  direction={"column"}>
           {isSmallerThan700 ? <DropDownMenu /> : <StackMenu />}       
        </Flex>
  );
}
