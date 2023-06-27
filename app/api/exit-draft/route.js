import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  // Exit the current user from "Draft Mode". This function accepts no args.
  draftMode().disable()
  redirect('/')
}
