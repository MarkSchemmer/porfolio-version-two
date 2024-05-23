import { PuzzleDrag } from "../../GameApps/puzzleDrag/PuzzleDrag";
import { TwentyFortyEightComponent } from "../../GameApps/2048/canvas-version/2048Canvas";
import { ConWaysGameOfLife } from "../../GameApps/ConwaysGameOfLife/conwaysGameofLife";
import { Box } from "@chakra-ui/layout";
import Iframe from "../../components/IFrame/Iframe";
import { SolarComponent } from "../../GameApps/Solar/SolarComponent";
import { PongComponent } from "../../GameApps/Pong/PongComponent";
import { MouseCurserComponent } from "../../GameApps/MouseCurserGame/MouseCurser";

const gameApps = {
    "Puzzle Drag" : {
        Src : PuzzleDrag
    },
    "2048": {
        Src: TwentyFortyEightComponent
    },
    "Conways Game Of Life": {
        Src: ConWaysGameOfLife
    },
    "Solar": {
        Src: SolarComponent
    },
    "Pong": {
        Src: PongComponent
    },
    "Mouse Game": {
        Src: MouseCurserComponent
    }
}

const renderGameApp = (key: any, value: any) => {
    const Src = value.Src;
    return (
        <Box w={500} h={500} p={0} m={"auto"} mt={150}>
            <Src />
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