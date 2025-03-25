import { Check, X } from "lucide-react"

const NotificationToast = ({ notification, clearNotification }) => {
    if (!notification) return null

    return (
        <div className="fixed top-24 right-4 z-50 bg-cambridge-blue-700 text-white py-3 px-4 rounded-xl shadow-lg flex items-center max-w-xs animate-fade-in">
            <Check size={18} className="mr-2 flex-shrink-0" />
            <span>{notification}</span>
            <button
                onClick={clearNotification}
                className="ml-3 text-white/80 hover:text-white"
            >
                <X size={14} />
            </button>
        </div>
    )
}

export default NotificationToast