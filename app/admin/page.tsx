
import StatCard from "@/components/statCard";
import { getRecentAppointments } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import Link from "next/link";


const Admin = async () => {
    const data = await getRecentAppointments()

    const appointment = data.Appointments
    const pending = data.pending
    const scheduled = data.scheduled
    const cancelled = data.cancelled


    return (
        <div className="mx-auto flex max-w-7xl flex-col space-y-14">
            <header className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg xl:px-12;">
                <Link href="/" className="cursor-pointer">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={32}
                        width={162}
                        alt="logo"
                        className="h-8 w-fit"
                    />
                </Link>

                <p className="text-16-semibold">Admin Dashboard</p>
            </header>

            <main className="flex flex-col items-center space-y-8 px-[5%] pb-12 xl:space-y-12 xl:px-12;">
                <section className="w-full space-y-4">

                    <h1 className="text-4xl font-bold md:text-3xl">Welcome 👋</h1>
                    <p className="text-dark-700">
                        Start the day with managing new appointments
                    </p>
                </section>

                <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10;">
                    <StatCard
                        count={scheduled}
                        label="Scheduled appointments"
                        icon={"/assets/icons/appointments.svg"}
                        bgColor="bg-yellow-500"
                        borderColor="border-yellow-400"
                        glowColor="shadow-yellow-500/20"
                    />
                    <StatCard
                        count={pending}
                        label="Pending appointments"
                        icon={"/assets/icons/pending.svg"}
                        bgColor="bg-yellow-500"
                        borderColor="border-yellow-400"
                        glowColor="shadow-yellow-500/20"


                    />
                    <StatCard

                        count={cancelled}
                        label="Cancelled appointments"
                        icon={"/assets/icons/cancelled.svg"}
                        bgColor="bg-red-400"
                        borderColor="border-red-400"
                        glowColor="shadow-red-400/20"
                    />
                </section>

                <section>
                    <FormTable />
                </section>


            </main>
        </div>

    );
};

export default Admin;

