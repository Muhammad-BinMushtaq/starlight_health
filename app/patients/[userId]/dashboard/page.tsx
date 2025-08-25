
// import { Calendar, Clock, CheckCircle2, User, Mail, Phone, MapPin, Edit3, AlertTriangle, ChevronLeft, ChevronRight, X } from 'lucide-react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { getPatient, getUser } from '@/lib/actions/patients.action';
// import PatientAccountUpdate from '@/components/forms/patientAccountUpdate';
// import RegisterForm from '@/components/forms/registerForm';

// const PatientDashboard = async ({ params }: { params: Promise<{ userId: string }> }) => {

//     const { userId } = await params
//     const user = await getUser(userId)
//     const RegistedUser = await getPatient(userId)






//     // const ProfileField = ({ label, value, isEditing, onChange, icon: Icon }) => (
//     //     <div className="mb-6">
//     //         <label className="flex items-center gap-2 text-gray-400 text-sm font-medium mb-2">
//     //             <Icon className="w-4 h-4" />
//     //             {label}
//     //         </label>
//     //         {isEditing ? (
//     //             <input
//     //                 type="text"
//     //                 value={value}
//     //                 onChange={onChange}
//     //                 className="w-full bg-gray-800/60 text-white rounded-lg px-4 py-3 border border-gray-600 focus:border-green-400 focus:outline-none"
//     //             />
//     //         ) : (
//     //             <div className="text-white font-medium bg-gray-800/40 rounded-lg px-4 py-3 border border-gray-700/50">
//     //                 {value}
//     //             </div>
//     //         )}
//     //     </div>
//     // );

//     return (
//         <div className="mx-auto flex max-w-7xl flex-col space-y-14">
//             <header className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg xl:px-12;">
//                 <Link href="/" className="cursor-pointer">
//                     <Image
//                         src="/assets/icons/logo-full.svg"
//                         height={32}
//                         width={162}
//                         alt="logo"
//                         className="h-8 w-fit"
//                     />
//                 </Link>

//                 <p className="text-16-semibold">User Dashboard</p>
//             </header>

//             <main className="flex flex-col items-center space-y-8 px-[5%] pb-12 xl:space-y-12 xl:px-12;">
//                 <section className="w-full space-y-4">

//                     <h1 className="text-4xl font-bold md:text-3xl">Welcome {User.name}👋</h1>
//                     <p className="text-dark-700">
//                         Start the day with managing new appointments
//                     </p>
//                 </section>

//                 {/* Profile and Info Section */}

//                 {/* Profile Details */}
//                 <section className="bg-gray-800/40 rounded-lg p-6 border border-gray-700/50">
//                     <div className="flex justify-between items-center mb-6">
//                         <h2 className="text-xl font-semibold text-white flex items-center gap-3">
//                             <User className="w-5 h-5 text-green-400" />
//                             Profile Details
//                         </h2>

//                     </div>
//                     <PatientAccountUpdate user={user} />
//                     <div>
//                         <RegisterForm userId={userId} user={RegistedUser} mode="update" />
//                     </div>
//                 </section>
//                 {/* <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10;">
//                     <StatCard
//                         count={scheduled}
//                         label="Scheduled appointments"
//                         icon={"/assets/icons/appointments.svg"}
//                         bgColor="bg-yellow-500"
//                         borderColor="border-yellow-400"
//                         glowColor="shadow-yellow-500/20"
//                     />
//                     <StatCard
//                         count={pending}
//                         label="Pending appointments"
//                         icon={"/assets/icons/pending.svg"}
//                         bgColor="bg-yellow-500"
//                         borderColor="border-yellow-400"
//                         glowColor="shadow-yellow-500/20"


//                     />
//                     <StatCard

//                         count={cancelled}
//                         label="Cancelled appointments"
//                         icon={"/assets/icons/cancelled.svg"}
//                         bgColor="bg-red-400"
//                         borderColor="border-red-400"
//                         glowColor="shadow-red-400/20"
//                     />
//                 </section> */}

//                 {/* <section className="w-full">
//                     <DataTable columns={columns} data={appointment} />
//                 </section> */}


//             </main>
//         </div>

//     );
// };

// export default PatientDashboard;