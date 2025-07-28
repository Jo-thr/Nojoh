"use client";

interface HeaderPageProps {
  title: string;
  description?: string;
}

const HeaderPage = ({ title, description }: HeaderPageProps) => {
  return (
    <div className="mb-10 w-full border-b pb-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex w-full items-center justify-start">
          <h1 className="font-workSans text-4xl font-black tracking-tighter">
            {title}
          </h1>
        </div>
      </div>
      {description && (
        <p className="text-muted-foreground my-3 w-1/2">{description}</p>
      )}
    </div>
  );
};
export default HeaderPage;
