import { memo } from 'react';
import CropCard from '../Crops/CropCard';

// Optimized crop card component
const MemoizedCropCard = memo(({ crop }) => (
    <CropCard crop={crop} />
));

MemoizedCropCard.displayName = 'MemoizedCropCard';

const ProductGrid = ({ products }) => {
    if (!products.length) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id}>
                    <MemoizedCropCard crop={product} />
                </div>
            ))}
        </div>
    );
};

export default memo(ProductGrid);