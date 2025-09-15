import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getUserCompanions, getUserSessions, getBookmarkedCompanions } from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
    const user = await currentUser();
    if (!user) redirect("/sign-in");

    const companions = await getUserCompanions(user.id);
    const sessionHistory = await getUserSessions(user.id);
    const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

    return (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
            {/* Profile Header */}
            <section className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* User Info */}
                <div className="flex items-center gap-4">
                    <Image
                        src={user.imageUrl}
                        alt={user.firstName!}
                        width={110}
                        height={110}
                        className="rounded-full border-2 border-primary"
                    />
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-gray-800">
                            {user.firstName} {user.lastName}
                        </h1>
                        <p className="text-sm text-gray-500">{user.emailAddresses[0].emailAddress}</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 flex-wrap">
                    <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4 w-40">
                        <div className="flex items-center gap-2">
                            <Image src="/icons/check.svg" alt="checkmark" width={22} height={22} />
                            <p className="text-2xl font-bold">{sessionHistory.length}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Lessons Completed</p>
                    </div>
                    <div className="flex flex-col items-center border border-gray-300 rounded-lg p-4 w-40">
                        <div className="flex items-center gap-2">
                            <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
                            <p className="text-2xl font-bold">{companions.length}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Companions Created</p>
                    </div>
                </div>
            </section>

            {/* Accordion Sections */}
            <Accordion type="multiple" className="space-y-4">
                <AccordionItem value="bookmarks">
                    <AccordionTrigger className="text-2xl font-bold text-gray-800">
                        Bookmarked Companions ({bookmarkedCompanions.length})
                    </AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList companions={bookmarkedCompanions} title="Bookmarked Companions" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="recent">
                    <AccordionTrigger className="text-2xl font-bold text-gray-800">Recent Sessions</AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList companions={sessionHistory} title="Recent Sessions" />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="companions">
                    <AccordionTrigger className="text-2xl font-bold text-gray-800">
                        My Companions ({companions.length})
                    </AccordionTrigger>
                    <AccordionContent>
                        <CompanionsList companions={companions} title="My Companions" />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    );
};

export default Profile;
