const SocialLink = ({ icon, platform, url }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-cambridge-blue-50 transition-colors"
            aria-label={`Follow us on ${platform}`}
        >
            <div className="text-cambridge-blue-600">
                {icon}
            </div>
            <span className="text-cambridge-blue-700">{platform}</span>
        </a>
    );
};

export default SocialLink;