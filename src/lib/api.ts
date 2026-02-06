type FetchOptions = RequestInit & {
	auth?: boolean
}

export async function apiFetch(path: string, options: FetchOptions = {}) {
	const validPath = path.startsWith("/") ? path : "/" + path

	const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${validPath}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...(options.headers || {}),
		},
	})

	if (!res.ok) {
		const text = await res.text()
		throw new Error(text || "Failed request")
	}

	if (res.status === 204) return null

	return res.json()
}
