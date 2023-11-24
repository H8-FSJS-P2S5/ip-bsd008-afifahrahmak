import Container from "react-bootstrap/Container";

function FooterComponent() {
  return (
    <footer className="footer text-light py-4">
      <Container>
        <div className="text-center">
          &copy; {new Date().getFullYear()} Hacktiv Health
        </div>
      </Container>
    </footer>
  );
}

export default FooterComponent;
