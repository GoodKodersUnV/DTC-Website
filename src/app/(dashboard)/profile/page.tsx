
import getCurrentUser from "@/actions/getCurrentUser";
import UserProfile from "./Profile";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

const Page = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        redirect("/signin");
    }

    return (
        <UserProfile currentUser={currentUser as User} />
    );
}

export default Page;