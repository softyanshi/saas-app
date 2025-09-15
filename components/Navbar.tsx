import Link from "next/link";
import Image from "next/image";
import NavItems from "@/components/NavItems";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
            {/* Logo */}
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={46}
                        height={44}
                        priority
                    />
                    <span className="text-xl font-bold text-gray-800"></span>
                </div>
            </Link>

            {/* Navigation & User Actions */}
            <div className="flex items-center gap-6">
                <NavItems />

                {/* Auth Buttons */}
                <SignedOut>
                    <SignInButton>
                        <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium">
                            Sign In
                        </button>
                    </SignInButton>
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    );
};

export default Navbar;

