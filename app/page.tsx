
import PatientForm from "@/components/forms/patientForm";
import Image from "next/image";
import Link from "next/link";



const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      {/*TODO: verification passkeys */}

      {/* Left Side (Form Section) */}
      <section className="flex-1  px-6 py-10 lg:py-16 lg:px-12">


        <div className="max-w-[400px] w-full mx-auto  flex flex-col gap-6">
          {/* Logo */}
          <Image
            src="/assets/icons/logo-full.svg"
            height={40}
            width={160}
            alt="Starlight Health Logo"
            className="mb-12"
          />

          {/* Patient Form */}
          <PatientForm />

          {/* Footer */}
          <div className="mt-10 flex flex-col items-center justify-between gap-4 text-sm text-gray-400 md:flex-row">
            <p className="text-center md:text-left">© 2024 Starlight Health</p>
            <Link href="/?admin=true" className="text-green-500 hover:underline">
              Admin
            </Link>
          </div>
        </div>
      </section>

      {/* Right Side (Image Section) - hidden on small screens */}
      {/* <div className="hidden lg:block lg:w-1/2 h-full "> */}
        <Image
          src="/assets/images/onboarding-img.png"
          height={1000}
          width={1000}
          alt="patient onboarding"
          className="hidden lg:block h-full w-auto object-cover rounded-l-2xl max-w-[40%]"
        />
      {/* </div> */}
    </div>
  );
};

export default Home;
