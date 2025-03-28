import SectionWrapper from "../Shared/SectionWrapper"

const Loading = () => {
    return (
        <SectionWrapper className="py-16">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-xl p-8 text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-cambridge-blue-100 rounded w-1/3 mx-auto mb-8"></div>
                        <div className="h-64 bg-cambridge-blue-100 rounded mb-8"></div>
                        <div className="h-4 bg-cambridge-blue-100 rounded w-2/3 mx-auto mb-4"></div>
                        <div className="h-4 bg-cambridge-blue-100 rounded w-1/2 mx-auto"></div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Loading