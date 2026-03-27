import { redirect } from 'next/navigation';

export default function RootPage() {
  // Automatically send anyone who visits localhost:3000 to the login page
  redirect('/login');
}