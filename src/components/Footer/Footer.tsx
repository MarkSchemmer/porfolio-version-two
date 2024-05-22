import { Box, Flex } from "@chakra-ui/react";


export default function Footer() {
    return (
        <Flex direction={"column"} minHeight={"100vh"}>
            <Box flex={"1"}></Box>
            <Flex        
        justify="center"
        align="center"
        bg="blue.500"
        color="white"
        h={"100px"}
        width="100%"
        padding="2">
                    Porfolio - SS Engineers 
            </Flex>
        </Flex>
    );
}