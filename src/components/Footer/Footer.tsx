import { Box, Flex } from "@chakra-ui/react";
import "../../components/component.css"

export default function Footer() {
    return (
        <Flex direction={"column"} minH={"100vh"}>
            <Box as="footer" bg={"gray.800"} color={"white"} py={"4"} mt={"auto"}>
                <Flex justifyContent={"center"}>
                    Porfolio - SS Engineers 
                </Flex>
            </Box>
        </Flex>
    );
}