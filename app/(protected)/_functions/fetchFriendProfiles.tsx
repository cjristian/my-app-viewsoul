import { profileUser } from "@/data/profileUser";
import { ProfileUser } from "@/interfaces/user";

export async function fetchFriendProfiles(friends: string[]): Promise<ProfileUser[]> {
    try {
        const profiles = await Promise.all(friends.map(friendId => profileUser(friendId)));
        return profiles.flat();
    } catch (error) {
        console.error("Error fetching friend profiles:", error);
        return [];
    }
}