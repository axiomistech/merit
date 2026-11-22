import { redirect } from 'next/navigation';

export default function MockTestItemRedirectPage() {
  redirect('/dashboard/qp-prep');
}
