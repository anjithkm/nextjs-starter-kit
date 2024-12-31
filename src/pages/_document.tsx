import { Html, Head, Main, NextScript } from 'next/document'

// #!/usr/bin/env sh
// . "$(dirname "$0")/_/husky.sh"

// echo "Running tests..."
// npm test

// #if [ $? -ne 0 ]; then
// #  echo "Tests failed. Please fix the issues before pushing."
// #  exit 1
// #fi

// echo "All tests passed. Pushing changes..."

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
