import { Skeleton } from "@/components/ui/skeleton"

export function ProfileSkeleton() {
    return (
        <div className="selection:bg-[rgb(250,204,21)] selection:text-black flex flex-col lg:flex-row justify-between lg:items-start items-center p-4 lg:p-8 gap-6 lg:gap-10">


            <div className="flex flex-col justify-center items-center lg:items-start">
                <Skeleton className="h-12 w-12 rounded-full bg-gray-200 mt-4" />
            </div>


            <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left">

                <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-2">
                    <Skeleton className="h-4 w-[300px] bg-gray-200" />
                </div>


                <p className="text-gray-500">
                    <Skeleton className="h-4 w-[250px] bg-gray-200 mt-5" />
                </p>


                <div className="space-y-2 w-full  text-center lg:text-left">
                    <Skeleton className="h-4 w-[200px] mt-5 bg-gray-200 " />
                </div>

            </div>
        </div>
    )
}
