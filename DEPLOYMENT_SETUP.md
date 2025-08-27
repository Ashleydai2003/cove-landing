# Vercel Rewrites Setup for Events Integration

## Overview
This configuration allows your main domain (`coveapp.co`) to serve your events app through `/events/*` routes while keeping the repositories separate.

## Files Modified

### 1. `vercel.json` (NEW)
- Added rewrites configuration to proxy `/events/*` requests to `https://coveweb-beryl.vercel.app/events/*`
- Handles both `/events` and `/events/[...path]` routes

### 2. `next.config.ts` (UPDATED)
- Added CORS headers for API routes to ensure proper cross-origin functionality

## How It Works

When users visit:
- `coveapp.co/events` → Proxied to `https://coveweb-beryl.vercel.app/events`
- `coveapp.co/events/some-event-id` → Proxied to `https://coveweb-beryl.vercel.app/events/some-event-id`
- `coveapp.co/` → Serves your main landing page

## Next Steps Required

### On Your Events App (coveweb-beryl.vercel.app):

1. **Update CORS Configuration** in your events app to include your main domain:
   ```javascript
   // In your events app's API routes or middleware
   const allowedOrigins = [
     'https://coveapp.co',
     'https://www.coveapp.co',
     'http://localhost:3000', // for development
     'https://coveweb-beryl.vercel.app' // keep existing
   ];
   ```

2. **Update any absolute URLs** in your events app to be relative or handle both domains

3. **Test the setup** after deployment

### Deployment

1. Deploy this updated main repository to Vercel
2. The rewrites will automatically take effect
3. Test by visiting `coveapp.co/events`

## Benefits

✅ **SEO-friendly**: All content served from your main domain
✅ **Clean URLs**: Users see `coveapp.co/events/*` in their browser  
✅ **Separate repos**: Keep your codebases independent
✅ **No DNS changes**: Works with existing domain setup
✅ **Easy maintenance**: Update events app independently

## Troubleshooting

If you encounter issues:
1. Check browser network tab for CORS errors
2. Verify the events app is accessible at `https://coveweb-beryl.vercel.app/events`
3. Ensure the events app accepts requests from `coveapp.co` 