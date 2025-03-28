import { Skeleton } from "@/components/ui/skeleton"
import { Coffee } from "lucide-react"

export default function CardSkeleton() {
    return (
        <div className="selection:bg-[rgb(250,204,21)] selection:text-black flex justify-center items-center h-auto">
            <div className="max-w-sm w-full p-4 bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Header Section */}
                <div className="flex justify-center items-center flex-col gap-2">
                    <Skeleton className="h-6 w-24 bg-gray-200 rounded-lg" />
                    <Skeleton className="h-4 w-40 bg-gray-200" />
                </div>

                {/* Content Section */}
                <div className="flex justify-center items-center flex-col gap-6 mt-4">
                    <div className="flex justify-center mb-4">
                        <Coffee size={48} color="#facc15" />
                    </div>

                    {/* Input Skeleton */}
                    <Skeleton className="h-10 w-[280px] bg-gray-200 rounded-md" />

                    {/* Textarea Skeleton */}
                    <Skeleton className="h-20 w-[280px] bg-gray-200 rounded-md" />

                    {/* Checkbox Skeleton */}
                    <div className="flex justify-start items-center space-x-2 mt-4 w-full">
                        <Skeleton className="h-4 w-4 bg-gray-200 rounded-sm" />
                        <Skeleton className="h-4 w-[220px] bg-gray-200 rounded-md" />
                    </div>

                    {/* Button Skeleton */}
                    <Skeleton className="h-10 w-[280px] bg-gray-200 rounded-md mt-2" />
                </div>
            </div>
        </div>
    )
}
