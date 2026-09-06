export function ComingSoon({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-heading text-2xl text-foreground">{title}</h1>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
