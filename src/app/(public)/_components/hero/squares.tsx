export function Squares() {
  return (
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-10 left-[10%] h-32 w-32 rounded-lg bg-primary/50" />
      <div className="absolute top-32 right-[15%] h-24 w-24 rounded-lg bg-primary/50" />
      <div className="absolute bottom-40 left-[20%] hidden h-40 w-40 rounded-lg bg-primary/80 md:block" />
      <div className="absolute top-[40%] right-[25%] h-28 w-28 rounded-lg bg-primary/60" />
      <div className="absolute right-[10%] bottom-20 h-36 w-36 rounded-lg bg-primary/80" />
      <div className="absolute top-[60%] left-[15%] h-20 w-20 rounded-lg bg-primary/30" />
      <div className="absolute top-20 left-[45%] h-24 w-24 rounded-lg bg-primary/20" />
      <div className="absolute right-[40%] bottom-[30%] hidden h-32 w-32 rounded-lg bg-primary/70 md:block" />
    </div>
  )
}
