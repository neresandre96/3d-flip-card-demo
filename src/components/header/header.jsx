import "./header.css";

function Header() {
  return (
      <header className="header">
        <a href="/" className="header-title">Flip Card 3D - DEMO v0.1</a>
        <nav className="nav-bar">
          <a
            className="nav-link"
            href="https://github.com/neresandre96/3d-flip-card"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            className="nav-link"
            href="https://neresandre96.github.io/3d-flip-card/"
            target="_blank"
            rel="noreferrer"
          >
            Docs
          </a>
        </nav>
      </header>
  );
}

export default Header;
