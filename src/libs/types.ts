import { Dispatch, SetStateAction } from "react";

export type UpdateProfile = {
    userId: string;
    email?: FormDataEntryValue | null;
    username?: FormDataEntryValue | null;
    bio?: FormDataEntryValue | null;
    profilePicture?: FormDataEntryValue | null;
    phoneNumber?: FormDataEntryValue | null;
    password?: FormDataEntryValue | null;

}
export type UserData = {
    username?: string | null | undefined;
    email?: string | null | undefined;
    bio?: string | null | undefined;
    phoneNumber?: string | null | undefined;
    profilePicture?: string | null | undefined;
    provider?: string | null | undefined;
}

export type NavProps = {
    user?: UserData | null;
    theme: string;
    setTheme: Dispatch<SetStateAction<string>>;
    showMenu: boolean;
    setShowMenu: Dispatch<SetStateAction<boolean>>;
}