// Server functions in app/server/ exist solely for the /dev tooling routes.
// Those routes are client-guarded in production (beforeLoad redirect), but the
// generated server-fn URLs are still reachable directly — saveOverrides would
// let anyone mutate signals/today.yml and steer the next pipeline run on any
// deployment with a writable filesystem. Refuse server-side, not just in the
// router.
export function assertDevOnly(): void {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('This endpoint is only available in development')
  }
}
