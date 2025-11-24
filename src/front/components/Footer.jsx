export const Footer = () => (
	<footer className="footer mt-auto py-4 bg-light border-top">
		<div className="container text-center">
			<div className="row">
				<div className="col-12">
					<p className="mb-2 fs-6 text-muted">
						<em>Made by Ian Garvey</em>
					</p>
					<div className="d-flex justify-content-center gap-3">
						<a
							href="https://www.linkedin.com/in/ian-garvey/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-dark text-decoration-none"
							style={{ fontSize: '1.2rem' }}
						>
							<i className="fab fa-linkedin me-1"></i>
							LinkedIn
						</a>
						<a
							href="https://github.com/iangarvey"
							target="_blank"
							rel="noopener noreferrer"
							className="text-dark text-decoration-none"
							style={{ fontSize: '1.2rem' }}
						>
							<i className="fab fa-github me-1"></i>
							GitHub
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
);
