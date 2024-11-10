import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getUser } from './actions/auth.actions';

export async function middleware(request: NextRequest) {
  const user = await getUser();
  const currentPath = request.nextUrl.pathname;

  console.log('User:', user);

  if (!user && currentPath.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    if (user?.roles && !user.roles.includes('admin') && currentPath.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
