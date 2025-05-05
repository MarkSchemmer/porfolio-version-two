import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Button, Heading, Text, Switch, FormControl, FormLabel, Box, Flex, SimpleGrid, VStack } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateChessBoard, UpdateChessTestingState, getBoard, getTestingState } from '../../../store/slices/chessSlice';
import { BoxPieces, ButtonControls } from './PieceButtons/PieceButtons';

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

    const handleChange = (evt: any, tst: any, dsp: any, bdobj: any) => {
        const name = evt.target.id; 
        const newValue = !tst[name];

        const newobj = Object.keys(tst).reduce((acc, cur:string) => {
            acc[cur] = false;
            return acc;
        }, {...tst});

        bdobj.clearBoardBgColor();
        dsp(UpdateChessBoard(boardobj));
        dsp(
            UpdateChessTestingState({...newobj, [name]: newValue})
        );
    };

    // console.log(testing);
    return (
        <Box>
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
                                    handleChange(evt, testing, dispatch, boardobj);
                                }} id='horozontal' isChecked={testing.horozontal} />

                                <FormLabel htmlFor='vertical'>Vertical squares click:</FormLabel>
                                <Switch onChange={(evt: any) => {
                                    handleChange(evt, testing, dispatch, boardobj);
                                }} id='vertical' isChecked={testing.vertical} />

                                <FormLabel htmlFor='diagonal'>Bishop squares click: :</FormLabel>
                                <Switch id='diagonal' onChange={(evt: any) => {
                                    handleChange(evt, testing, dispatch, boardobj);
                                }} isChecked={testing.diagonal} />

                                <FormLabel htmlFor='knight'>Knight squares click:</FormLabel>
                                <Switch id='knight' onChange={(evt: any) => {
                                    handleChange(evt, testing, dispatch, boardobj);
                                }} isChecked={testing.knight} />

                                <FormLabel htmlFor='rook'>Rook squares click:</FormLabel>
                                <Switch id='rook' onChange={(evt: any) => {
                                    handleChange(evt, testing, dispatch, boardobj);
                                }} isChecked={testing.rook} />

                                <FormLabel htmlFor='queen'>Queen squares click:</FormLabel>
                                <Switch id='queen' onChange={(evt: any) => {
                                    handleChange(evt, testing, dispatch, boardobj);
                                }} isChecked={testing.queen} />
                            </FormControl>
                        </Flex>
                    </VStack>
                </CardFooter>
            </Card>

            <Card align='center'>
            <CardHeader>
                <Heading size='md'>Piece Manipulation Board</Heading>
            </CardHeader>
            <CardBody>
                    <Text>Activate button then select </Text>
            </CardBody>
                <CardFooter>
                    <VStack spacing={"25px"}>
                        <Flex display={"block"}>
                            <FormControl as={SimpleGrid} columns={{ base: 1, lg: 1 }}>
                                <BoxPieces />
                                {/* Pieces will  */}
                                <ButtonControls />
                            </FormControl>
                        </Flex>
                    </VStack>
                </CardFooter>
            </Card>
        </Box>
    )
}

