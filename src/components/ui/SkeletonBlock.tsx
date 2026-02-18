export const SkeletonBlock = ({ className = 'h-24' }: { className?: string }) => (
  <div className={`animate-pulse rounded-2xl bg-[linear-gradient(90deg,rgba(106,162,255,0.14),rgba(255,255,255,0.3),rgba(106,162,255,0.14))] ${className}`} />
)
