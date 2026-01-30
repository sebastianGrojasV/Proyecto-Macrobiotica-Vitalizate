import { ReactNode } from 'react';
import Header from '@/components/custom/Header';
import Footer from '@/components/custom/Footer';
import ChatAssistant from '@/components/custom/ChatAssistant';

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-natural">
      <Header cartItemsCount={3} />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatAssistant />
    </div>
  );
}