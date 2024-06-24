import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, Switch, FormControl, FormLabel, Box, Flex, SimpleGrid, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateChessBoard, UpdateChessTestingState, getBoard, getTestingState } from '../../../store/slices/chessSlice';

/*
    Let's create a styling dashboard where we can toggle: 

    - path finding
    - game features such as: 
            * check
            * castle
            * en-pessant
    - peiece visibility
    - mouse click features ect

    ect, ect, ect... 

    Even cool different testing scenarios to make 
    sure that even piece is working good with other pieces 
    and by themselves this allows for the programmer 
    to add and take away features from the game 
    and solve 1 issue at a time. 

*/
export const TestingDashboard = () => {
    const testing = useSelector(getTestingState);
    const dispatch = useDispatch();
    const boardobj = useSelector(getBoard);
    // console.log(testing);
    return (
            <Card align='center'>
            <CardHeader>
                <Heading size='md'> Testing Dashboard</Heading>
            </CardHeader>
            <CardBody>
                    <Text>Down below are a set of toggles you can play to make sure that</Text>
                    <Text>You can add features or disable to enable the programmer to visually test</Text>
                    <Text>This is meant as a additional layer of testing other than unit tests.</Text>
            </CardBody>
            <CardFooter>
                <VStack spacing={"25px"}>
                    <Box display='block'>
                        <Button colorScheme='blue'>Testing tools below: </Button>
                    </Box>

                    <Box>
                        <Text><strong>Square connectivity checks:</strong></Text>
                    </Box>
                    <Flex display={"block"}>
                        <FormControl as={SimpleGrid} columns={{ base: 2, lg: 4 }}>
                            <FormLabel htmlFor='horozontal'>Horizontal squares click:</FormLabel>
                            <Switch onChange={(evt:any) => { 
                                const newValue = !testing.detectHorizontalSquares;
                                if (newValue === false) {
                                    boardobj.clearBoardBgColor();
                                    dispatch(UpdateChessBoard(boardobj));
                                }
                                dispatch(
                                    UpdateChessTestingState({...testing, detectHorizontalSquares: newValue})
                                ) 
                            }} id='horozontal' isChecked={testing.detectHorizontalSquares} />

                            <FormLabel htmlFor='isDisabled'>isDisabled:</FormLabel>
                            <Switch id='isDisabled' />

                            <FormLabel htmlFor='isFocusable'>isFocusable:</FormLabel>
                            <Switch id='isFocusable' />

                            <FormLabel htmlFor='isInvalid'>isInvalid:</FormLabel>
                            <Switch id='isInvalid' />

                            <FormLabel htmlFor='isReadOnly'>isReadOnly:</FormLabel>
                            <Switch id='isReadOnly' />

                            <FormLabel htmlFor='isRequired'>isRequired:</FormLabel>
                            <Switch id='isRequired' />
                        </FormControl>
                    </Flex>
                </VStack>
  
            </CardFooter>
            </Card>
    )
}