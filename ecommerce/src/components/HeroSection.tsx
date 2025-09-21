
interface HeroSectionProps {
  heroImageUrl: string;
  // Add a new prop for the buttons action 
  onScrollToProducts: () => void;
}

const HeroSection = ({ heroImageUrl, onScrollToProducts}: HeroSectionProps) => (
  <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-white shadow-lg rounded-b-3xl md:rounded-b-[4rem]">
    <div className="md:w-1/2 p-4">
      <img
        src={heroImageUrl}
        alt="Fresh Groceries"
        className="rounded-3xl shadow-lg w-full max-h-96 object-cover"
      />
    </div>
    <div className="md:w-1/2 p-4 text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
        Buy Fresh Groceries with Ease
      </h1>
      <p className="mt-4 text-gray-600 max-w-sm mx-auto md:mx-0">
        Shop your favorite produce, dairy, and more from the comfort of your home.
      </p>
      <button 
        onClick={onScrollToProducts}
          
      className="mt-8 bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition duration-300 transform hover:scale-105">
        Start Shopping
      </button>
    </div>
  </div>
);

export default HeroSection;