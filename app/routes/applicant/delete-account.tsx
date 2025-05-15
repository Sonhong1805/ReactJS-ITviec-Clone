import DeleteAccount from "~/pages/applicant/DeleteAccount";
import type { Route } from "./+types/delete-account";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Delete account | ITviec" },
    {
      name: "description",
      content: "Reason for delete account",
    },
  ];
}

export default function RouteDeleteAccount() {
  return <DeleteAccount />;
}
