
function Footer() {
  return (
    <footer className="lg:border-t-[1px] lg:border-t-neutral-200">
      <div className="px-4 md:px-8 xl:px-0 mx-auto max-w-[1192px] pt-8 pb-5 md:py-10 flex flex-col-reverse gap-6 md:flex-row justify-between items-center md:gap-0">
        <p className="text-preset-9 text-neutral-900">Made with ❤️ and 🥑</p>
        <div className="flex space-x-6">
          <a
            href="#"
            className="hover:opacity-70 transition-opacity duration-150 ease-in"
            aria-label="Instagram"
          >
            <img src="/assets/images/icon-instagram.svg" alt="" />
          </a>
          <a
            href="#"
            className="hover:opacity-70 transition-opacity duration-150 ease-in"
            aria-label="Bluesky"
          >
            <img src="/assets/images/icon-bluesky.svg" alt="" />
          </a>
          <a
            href="#"
            className="hover:opacity-70 transition-opacity duration-150 ease-in"
            aria-label="Tiktok"
          >
            <img src="/assets/images/icon-tiktok.svg" alt="" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

