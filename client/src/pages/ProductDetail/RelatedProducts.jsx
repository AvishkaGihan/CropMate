import React from 'react';
import CropCard from '../../components/Crops/CropCard';

const RelatedProducts = ({ products }) => {
    if (!products.length) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
                <div key={product.id}>
                    <CropCard crop={product} />
                </div>
            ))}
        </div>
    );
};

export default React.memo(RelatedProducts);