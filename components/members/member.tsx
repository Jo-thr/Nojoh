import { Button } from "../ui/button";

interface MemberProps {
  data?: any;
}

const Member = ({ data }: MemberProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="relative mb-2 aspect-square w-40 overflow-hidden rounded-full border-4">
        <img
          src={data.image || ""}
          alt="Member Avatar"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-xl font-bold">
        {data.lastName} {data.firstName}
      </div>
      <div className="text-primary mb-4 text-base">@{data.username}</div>
      <Button>View Profile</Button>
    </div>
  );
};

export default Member;
