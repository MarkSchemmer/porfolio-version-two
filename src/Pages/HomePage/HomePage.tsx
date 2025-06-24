import React from "react";
import { Text } from "@chakra-ui/react";
import { TextUtils } from "./HomePageText";
import {
    ListItem,
    UnorderedList,
  } from "@chakra-ui/react";
  import { Box } from "@chakra-ui/react";

const HomePageText = () => {
    const ListItems = () => {
        return (
            <Box mt="15px" mb="15px">
                <UnorderedList>
                    {TextUtils.listOfApps.map(i => <ListItem>{i}</ListItem>)}
                </UnorderedList>
            </Box>
        )
    }
    return (
    <Box w="70%" p={"15px"} m={"auto"}>
        <Text mb={"15px"}>
            {TextUtils.IntroText}
        </Text>
        <Text mb={"15px"}>
            {TextUtils.ListText}
            <ListItems />
        </Text>
        <Text mb={"15px"}>
            {TextUtils.EndingText}
        </Text>
    </Box>
    );
}

export default function HomePage() {
    return (
        <Box>
            <HomePageText />
        </Box>
    );
}