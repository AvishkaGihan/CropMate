import SectionWrapper from "../Shared/SectionWrapper"

const Product404 = () => {
    return (
        <SectionWrapper className="py-16">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-semibold text-cambridge-blue-800 mb-4">Product Not Found</h2>
                    <p className="text-cambridge-blue-600 mb-6">The product you're looking for could not be found.</p>
                    <Link to="/marketplace" className="text-golden-brown-500 hover:text-golden-brown-600 inline-flex items-center">
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Marketplace
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Product404