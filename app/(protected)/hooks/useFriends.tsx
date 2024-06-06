import { useEffect, useState } from "react";
import { getListFriendIds } from "@/data/listFriends";
import { useCurrentUser } from "@/hooks/use-current-user";

export function useFriends() {
    const user = useCurrentUser();
    const [friends, setFriends] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

  
    const refetch = () => {
        setLoading(true); 
        setError(null); 
        if (user?.id) {
            getListFriendIds(user.id)
                .then(friends => {
                    if (Array.isArray(friends)) {
                        setFriends(friends);
                    } else if (friends.error) {
                        setError("Hubo un error al cargar los amigos");
                    }
                })
                .catch(error => {
                    setError(error.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        refetch(); 
    }, [user]);

    return {
        friends,
        loading,
        error,
        refetch 
    };
}
