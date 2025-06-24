import React from "react";
import { useCodeWarsData } from "../../hooks/useCodeWarsData";

export const CodeWarsPage = () => {
    const cwData = useCodeWarsData();
    return (
        <div className="cw-page">
            CW Page
        </div>
    );
}