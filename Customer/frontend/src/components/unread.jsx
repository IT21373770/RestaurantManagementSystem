import React, { useEffect, useState } from "react";
import axios from "axios";

function UnreadCount() {
    const [unreadCount, setUnreadCount] = useState(0);


    const user = JSON.parse(localStorage.getItem("userData"));

    // useEffect(() => {
    //     const fetchUnreadCount = () => {
    //         axios
    //             .get("http://localhost:8090/chat/unreadCount", {
    //                 params: { userId: user.user._id },
    //             })
    //             .then((res) => {
    //                 setUnreadCount(res.data.unreadCount);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             });
    //     };

    //     fetchUnreadCount();

    //     const interval = setInterval(fetchUnreadCount, 2000); // Refresh the count every 2 seconds

    //     return () => clearInterval(interval);
    // }, [user.user._id]);

    return (
        <span className="unread-count">
            {unreadCount}
        </span>
    );
}

export default UnreadCount;
