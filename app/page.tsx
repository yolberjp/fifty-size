import BrandSizeMenu from './components/brand-size-menu/brand-size-menu';

export default function Home() {
  return (
    <div>
      <main className="flex flex-col gap-10 items-center mt-[10%] max-w-5xl w-full m-auto">
        <h1 className="text-7xl font-bold p-1 bg-clip-text text-transparent bg-gradient-to-r from-red-700 to-purple-800">
          Fifty Size
        </h1>

        <BrandSizeMenu />
      </main>
    </div>
  );
}
