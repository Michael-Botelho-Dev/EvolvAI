export default function ProgressBar({ value }) {
    return (
        <div className="w-full bg-gray-200 rounded-xl h-2">
            <div className="h-2 rounded-xl" style={{ width: `${Math.round(value * 100)}%` }} />
        </div>
    )
}