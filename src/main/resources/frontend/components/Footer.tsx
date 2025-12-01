const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted mt-16 py-8">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <p>© {currentYear} AdoteAI. Todos os direitos reservados.</p>
        <p className="mt-2 text-sm">
          Conectando animais a lares amorosos 🐾
        </p>
      </div>
    </footer>
  );
};

export default Footer;
