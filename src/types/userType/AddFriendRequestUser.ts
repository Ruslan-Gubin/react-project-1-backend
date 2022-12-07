

interface AddFriendRequestUserBody {
  user: {
    image: {
      public_id: string;
      url: string;
    };
    _id: string;
    fullName: string;
    email: string;
    requestFriends: string[];
    friends: string[];
    dialogs: string[];
  };
  guest: string;
}

export type { AddFriendRequestUserBody };
