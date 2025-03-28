import { memo } from "react";

const BackgroundElements = () => (
    <>
        <div className="absolute top-0 right-0 w-60 h-60 bg-mindaro-400/8 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-golden-brown-400/8 rounded-full blur-2xl"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>
    </>
);

export default memo(BackgroundElements);