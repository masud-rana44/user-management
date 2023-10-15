const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col border-4 border-indigo-600">
      <header className="bg-indigo-600 py-4 text-center text-xl  font-semibold text-white">
        User Management System
      </header>
      <main className="flex-1 bg-gray-200">{children}</main>
    </div>
  );
};

export default MainLayout;
