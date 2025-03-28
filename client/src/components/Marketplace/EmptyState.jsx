import { memo } from 'react';
import { Search } from 'lucide-react';
import { FormButton } from '../Shared/Form';

const EmptyState = ({ resetFilters }) => {
    return (
        <div className="bg-white rounded-xl p-8 text-center border border-cambridge-blue-100/50">
            <div className="w-16 h-16 mx-auto bg-cambridge-blue-50 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-cambridge-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-cambridge-blue-800 mb-2">No products found</h3>
            <p className="text-cambridge-blue-600 mb-4">
                We couldn't find any products matching your criteria. Try adjusting your filters.
            </p>
            <FormButton variant="outline" onClick={resetFilters}>
                Reset Filters
            </FormButton>
        </div>
    );
};

export default memo(EmptyState);