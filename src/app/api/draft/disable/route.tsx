import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const url = searchParams.get('url');

  const draft = await draftMode();
  draft.disable();

  if (!url) return new Response('Draft mode is disabled');

  //to avoid losing the cookie on redirect in the iFrame
  const cookieStore = await cookies();
  const cookie = cookieStore.get('__prerender_bypass')!;
  cookieStore.set({
    name: '__prerender_bypass',
    value: cookie?.value,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
    // Given that this route can also be accessed within the iframe of the Web Previews plugin,
    // it is important to bypass the restrictions for third-party cookies by setting the
    // `partitioned: true` option (https://developers.google.com/privacy-sandbox/3pcd)
    partitioned: true,
  });

  redirect(url);
}
