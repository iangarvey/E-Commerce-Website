export const Footer = () => (
	<footer className="footer py-4 bg-primary-subtle text-center">
		<div className="container">
			<p className="text-primary fw-bold mb-3" style={{ fontSize: '1.1rem', letterSpacing: '0.5px' }}>
				✨ Built by <span className="fst-italic">Ian Garvey</span> ✨
			</p>
			<p className="text-muted small mb-3">
				<a href="https://linkedin.com/in/ian-garvey" className="text-primary text-decoration-none me-3 fw-medium">
					<i className="fab fa-linkedin me-1"></i>LinkedIn
				</a>
				<a href="https://github.com/iangarvey" className="text-primary text-decoration-none fw-medium">
					<i className="fab fa-github me-1"></i>GitHub
				</a>
			</p>
		</div>
	</footer>
);
