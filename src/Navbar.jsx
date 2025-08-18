function Navbar(props) {
  return (
    <div className="border-b border-gray-600 bg-white sticky top-0 left-0 right-0 flex justify-between items-center py-3">
      <span className="mx-2 flex items-center">
        <img
          className="inline rounded-xl h-8 w-8"
          src="src/assets/logo.jpeg"
          alt="logo"
        ></img>
        <span>OSCompass</span>
      </span>
      <span className="mx-2 flex justify-between items-center">
        <button className="mx-1 px-3 py-1 border border-black rounded-lg hover:bg-black hover:text-white">
          Mode
        </button>
      </span>
    </div>
  );
}

export default Navbar;
