import { Leaf } from 'lucide-react';
import { memo } from 'react'

const BackgroundDecoration = () => (
    <>
        {/* Leaf decorations */}
        <div className="absolute top-40 left-10 w-16 h-16 text-cambridge-blue-500/10 transform rotate-45">
            <Leaf size={120} className="w-full h-full" />
        </div>

        <div className="absolute bottom-40 right-10 w-20 h-20 text-golden-brown-500/10 transform -rotate-12">
            <Leaf size={120} className="w-full h-full" />
        </div>
    </>
);

export default memo(BackgroundDecoration);