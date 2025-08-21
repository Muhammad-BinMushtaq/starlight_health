
import Image from "next/image";
type StatCardProps = {
    count: string;
    label: string;
    icon: string;
    bgColor: string;
    borderColor: string;
    glowColor: string
};

const StatCard = ({ bgColor, borderColor, glowColor, count, label, icon }: StatCardProps) => {
    return (
        <div className="flex flex-col justify-center items-start p-6 gap-4 relative w-full sm:w-[350px] lg:w-[400px] h-auto min-h-[140px] bg-gradient-to-br from-[rgba(215,237,237,0.16)] to-[rgba(204,235,235,0)] rounded-xl">
            <div className="flex flex-row items-center gap-3.5 z-10">

                <Image
                    height={20}
                    width={20}
                    alt="icon"
                    src={icon}

                    className={`w-8 h-8  ${glowColor} flex items-center justify-center`} />

                <p className="text-2xl font-bold text-white">{count}</p>
            </div>
            <p className="text-base font-medium text-white z-10">{label}</p>
            <div className={`absolute w-28 h-28 left-3 top-12 opacity-10 blur-3xl ${bgColor} z-0`}></div>
        </div>
    );
};

export default StatCard