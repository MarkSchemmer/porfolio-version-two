import { PuzzleDrag } from "../../GameApps/puzzleDrag/PuzzleDrag";
import { TwentyFortyEightComponent } from "../../GameApps/2048/canvas-version/2048Canvas";
import { ConWaysGameOfLife } from "../../GameApps/ConwaysGameOfLife/conwaysGameofLife";
import { Box } from "@chakra-ui/layout";
import Iframe from "../../components/IFrame/Iframe";

const gameApps = {
    "Puzzle Drag" : {
        Src : PuzzleDrag
    },
    "2048": {
        Src: TwentyFortyEightComponent
    },
    "Conways Game Of Life": {
        Src: ConWaysGameOfLife
    }
}

const renderGameApp = (key: any, value: any) => {
    const Src = value.Src;
    return (
        <Box w={500} m={"auto"}>
            <Iframe styles={{width: '500px', height: '650px', padding: 0}}>
                    <Src />
            </Iframe>
        </Box>
    )
}

export const GameApps = () => {
    return (
        <>
            Game Apps : 
            {Object.entries(gameApps).map(([key, value]) => renderGameApp(key, value))}
        </>
    )
}