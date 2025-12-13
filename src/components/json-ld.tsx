export default function JsonLd<T>({ content }: { content: T }) {
	return (
		<script
			type="application/ld+json"
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(content).replace(/</g, "\\u003c"),
			}}
		/>
	);
}
