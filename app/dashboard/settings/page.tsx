// NEXT
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Manage your profile settings here'
}

export default async function SettingsPage() {
  return (
    <h1>Welcome to SettingsPage</h1>
  );
}