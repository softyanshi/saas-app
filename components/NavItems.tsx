'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' },
    { label: 'Subscription', href: '/subscriptions' },
];

const NavItems = () => {
    const pathname = usePathname();

    return (
        <div className="flex items-center gap-6">
            {navItems.map(({ label, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={cn(
                        "text-gray-700 hover:text-primary transition-colors duration-200 font-medium relative",
                        pathname === href && "text-primary font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-primary"
                    )}
                >
                    {label}
                </Link>
            ))}
        </div>
    );
};

export default NavItems;

