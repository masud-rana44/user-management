const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full border-4 border-indigo-600">
      <header className="bg-indigo-600 py-4 text-center text-xl  font-semibold text-white">
        User Management System
      </header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
