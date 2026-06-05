// Stripe test-mode pattern: demo status is structural disclosure, not decoration.
export function DemoBanner() {
  return (
    <div className="border-b border-amber-200 bg-amber-50/80 px-6 py-1.5">
      <p className="text-xs text-amber-900">
        Demo data — 200 seeded customers. Connect a store to see your own.
      </p>
    </div>
  );
}
