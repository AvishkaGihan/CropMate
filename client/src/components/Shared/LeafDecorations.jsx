import { memo } from 'react';
import { Leaf } from 'lucide-react';

const LeafDecorations = () => (
    <>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-mindaro-500/30 to-transparent"></div>

        <div className="absolute top-10 left-10 text-cambridge-blue-700/10">
            <Leaf size={120} className="transform rotate-45" />
        </div>

        <div className="absolute bottom-40 right-10 text-mindaro-400/5">
            <Leaf size={180} className="transform -rotate-12" />
        </div>

        <div className="absolute bottom-20 left-1/3 text-golden-brown-500/5">
            <Leaf size={100} className="transform rotate-90" />
        </div>
    </>
);

export default memo(LeafDecorations);