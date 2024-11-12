import { NextResponse } from 'next/server';

export function middleware(req) {
    const url = req.nextUrl.clone();
    const token = req.cookies.get('access_token');

    return NextResponse.next();
}