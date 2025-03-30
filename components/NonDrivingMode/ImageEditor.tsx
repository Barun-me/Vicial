import React from 'react'

function ImageEditor({
    onClose,
    previewURL,
    settings,
    setSettings
}: {
    onClose: () => void;
    previewURL: string;
    settings: {
        type: "original" | "wide" | "square";
        sensitive: boolean;
    };
    setSettings: React.Dispatch<
        React.SetStateAction<{
            type: "original" | "wide" | "square";
            sensitive: boolean;
        }>
    >;
}) {
    return (
        <div className="fixed w-screen h-screen left-0 top-0 
        bg-black opacity-50 z-10 flex items-center justify-center">
            <div className="bg-white rounded-xl p-12 flex flex-col gap-4">
            ImageEditor
            </div>
        </div>
    )
}

export default ImageEditor