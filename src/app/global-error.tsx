"use client";

// Last resort when the root layout itself fails: no providers, fonts or translations are
// available here, so it renders its own minimal document
export default function GlobalError({ reset }: { reset: () => void }) {
	return (
		<html lang="en">
			<body
				style={{
					minHeight: "100vh",
					margin: 0,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: "1rem",
					fontFamily: "system-ui, sans-serif",
					background: "#11151a",
					color: "#eeeeee",
				}}
			>
				<h1 style={{ margin: 0, fontSize: "1.75rem" }}>Something went wrong</h1>
				<button
					type="button"
					onClick={reset}
					style={{
						padding: "0.6rem 1.4rem",
						borderRadius: "0.375rem",
						border: 0,
						background: "#eeeeee",
						color: "#11151a",
						cursor: "pointer",
					}}
				>
					Try again
				</button>
			</body>
		</html>
	);
}
