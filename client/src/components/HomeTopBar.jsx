import AuthThemeControls from './AuthThemeControls';

const HomeTopBar = () => {
  return (
    <div className="hidden md:flex justify-end sticky top-0 z-20 px-6 py-4 bg-white/80 dark:bg-[rgb(16,23,42)]/80 backdrop-blur">
      <AuthThemeControls />
    </div>
  );
};

export default HomeTopBar;
