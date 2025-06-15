import { Flex } from "@chakra-ui/react";


export default function Footer() {
    return (
            <Flex   
            style={{
                position: 'absolute',
                top: '100%',
                marginTop: '100px'
            }}
        justify="center"

        align="center"
        bg="blue.500"
        color="white"
        h={"100px"}
        width="100%">
                    Porfolio - SS Engineers 
            </Flex>

    );
}