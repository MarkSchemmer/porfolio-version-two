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
        Src : PuzzleDrag,
        useIframe: false
    },
    "2048": {
        Src: TwentyFortyEightComponent,
        useIframe: false
    },
    "Conways Game Of Life": {
        Src: ConWaysGameOfLife,
        useIframe: false
    },
    "Solar": {
        Src: SolarComponent,
        useIframe: false
    },
    "Pong": {
        Src: PongComponent,
        useIframe: false
    },
    "Mouse Game": {
        Src: MouseCurserComponent,
        useIframe: true
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

const renderGameAppIframe = (key: any, value: any) => {
    const Src = value.Src;
    return (
        <Box w={500} h={500} p={0} m={"auto"} mt={150}>
            <Iframe styles={{width: "500px",  height:"500px"}}>
                <Src />
            </Iframe>
        </Box>
    )
}

export const GameApps = () => {
    return (
        <>
            Game Apps : 
            {Object.entries(gameApps).map(([key, value]) => value.useIframe ? renderGameApp(key, value) : renderGameApp(key, value))}
        </>
    )
}