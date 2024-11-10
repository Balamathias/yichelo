import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './actions/auth.actions';

export async function middleware(request: NextRequest) {
  const user = await getUser();
  const currentPath = request.nextUrl.pathname;

  if (!user && currentPath.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (user && (currentPath.startsWith('/login') || currentPath.startsWith('/register'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (user && currentPath.startsWith('/dashboard') && !user.roles?.includes('admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
